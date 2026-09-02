import styles from "./Chat.module.css";
import { useEffect, useReducer, useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import { create, edit, remove } from "@/fieldsets/messageFieldsets";
import { actions, dispatcher } from "@/reducers/messageReducer";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";
import Messages from "@/components/Messages/Messages";

export default function Chat({ initialChat, initialData, profileDialogRef }) {
  const [messages, dispatchMessages] = useReducer(dispatcher, initialChat);
  const editDialog = useRef(null);
  const removeDialog = useRef(null);

  useEffect(() => {
    dispatchMessages({
      type: actions.load,
      payload: initialChat,
    });
  }, [initialChat.chatId]);

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <img src={initialData.image} alt={`${initialData.title} picture`} />
        <h3 onClick={() => profileDialogRef.current.showModal()}>
          {initialData.title}
        </h3>
      </div>

      <Messages
        messages={messages.messages}
        all={messages.page === 0}
        currentUserId={messages.currentAuthorId}
        scrollHandler={async () => {
          if (!messages.page) return console.log("There are no more messages.");

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
              handler: () => removeDialog.current.showModal(),
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
      {!messages.error && (
        <>
          <Dialog ref={editDialog}>
            <Form
              fieldsets={edit}
              initialData={{ content: messages.selected.content || "" }}
              submit={{ text: "Edit", handler: editHandler }}
            />
          </Dialog>
          <Dialog ref={removeDialog}>
            <p>Are you sure you want to delete this message?</p>
            <Form
              fieldsets={remove}
              initialData={{ id: messages.selected.id || "" }}
              submit={{ text: "Yes", handler: removeHandler, disable: false }}
            />
          </Dialog>
        </>
      )}
    </div>
  );

  async function submitHandler(message) {
    if (!messages.chatId && initialData.type === "user") {
      const chat = await requestHandler.post({}, "chat");

      const users = [{ id: "current" }, { id: initialData.id }];

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
    removeDialog.current.close();
  }
}
