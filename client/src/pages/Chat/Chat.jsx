import styles from "./Chat.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import { create, edit } from "@/fieldsets/messageFieldsets";
import { actions, dispatcher } from "@/reducers/messageReducer";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";
import Loader from "@/components/Loader";
import FormField from "@/components/FormField/FormField";
import Messages from "@/components/Messages/Messages";

export default function Chat() {
  document.title = `${import.meta.env.VITE_TITLE}: Chat`;

  const locationState = useLocation().state;
  if (!locationState) return location.replace("/");
  const [messages, dispatchMessages] = useReducer(dispatcher, {});
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  useEffect(() => {
    (async () => {
      let response = {};

      if (locationState.chat.id)
        response = await requestHandler.get(
          `message/chat/${locationState.chat.id}/`,
        );
      else {
        switch (locationState.chat.type) {
          case "user":
            response = await requestHandler.get(
              `chat/otherUser/${locationState.id}`,
            );
            break;
          case "group":
            response = await requestHandler.get(
              `chat/group/${locationState.id}`,
            );
            break;
        }
      }

      dispatchMessages({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });
    })();
  }, []);

  if (!Object.keys(messages).length || messages.error)
    return <Loader text={messages.error || "Getting messages..."} />;

  return (
    <div className={`page ${styles.chat}`}>
      <div className={styles.header}>
        <img src={locationState.image} alt={`${locationState.title} picture`} />
        <h3
          onClick={() =>
            location.assign(
              `/profile/${locationState.chat.type}/${locationState.id}`,
            )
          }
        >
          {locationState.title}
        </h3>
      </div>

      <Messages
        messages={messages.messages}
        all={messages.page === 0}
        currentUserId={messages.currentAuthorId}
        scrollHandler={async () => {
          if (!messages.page) return alert("There are no more messages.");

          const response = await requestHandler.get(
            `message/chat/${messages.chatId}?q=${messages.page}`,
          );

          dispatchMessages({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });

          if (response.error) return true;
        }}
        menu={{
          options: [
            {
              text: "Edit",
              handler: () => editDialog.current.showModal(),
            },
            {
              text: "Delete",
              handler: () => deleteDialog.current.showModal(),
            },
          ],
          buttonHandler: (message) =>
            dispatchMessages({
              type: actions.select,
              payload: { selectedMessage: message },
            }),
        }}
      />

      <div className={styles.footer}>
        <Form
          fieldsets={create}
          initialData={{
            authorId: messages.currentAuthorId,
            chatId: messages.chatId,
          }}
          submit={{ text: "Send", handler: submitHandler }}
        />
      </div>
      <Dialog ref={editDialog}>
        <FormField
          properties={edit[1].fields[0]}
          value={messages.selected.content || ""}
          changeHandler={(id, value) =>
            dispatchMessages({
              type: actions.changeSelected,
              payload: { id, value },
            })
          }
        />
        <button onClick={() => editHandler()}>Edit</button>
      </Dialog>
      <Dialog ref={deleteDialog}>
        <p>Are you sure you want to delete this message?</p>
        <FormField
          properties={edit[0].fields[0]}
          value={messages.selected.id || ""}
        />
        <button onClick={() => removeHandler()}>Yes</button>
      </Dialog>
    </div>
  );

  async function submitHandler(message) {
    if (!messages.chatId && locationState.chat.type === "user") {
      const chat = await requestHandler.post({}, "chat");

      const users = [
        { id: messages.currentAuthorId },
        { id: locationState.id },
      ];

      const addMembers = await requestHandler.post(
        {
          chatMembers: prepareChatMembers(users, chat.data.id),
        },
        "chatMember",
      );
      if (addMembers.error) return alert(addMembers.error);

      message.chatId = chat.data.id;
    }
    const send = await requestHandler.postFile(
      removeEmptyFields(message),
      "message",
    );
    if (send.error) return alert(send.error);

    dispatchMessages({
      type: actions.add,
      payload: {
        data: send.data,
      },
    });
  }
  async function editHandler() {
    const edited = await requestHandler.put(messages.selected, "message");
    if (edited) return alert(edited.error);

    dispatchMessages({
      type: actions.edit,
    });
    editDialog.current.close();
  }
  async function removeHandler() {
    const removed = await requestHandler.delete(
      messages.selected.id,
      "message",
    );
    if (removed) return alert(removed.error);

    dispatchMessages({
      type: actions.remove,
    });
    deleteDialog.current.close();
  }
}
