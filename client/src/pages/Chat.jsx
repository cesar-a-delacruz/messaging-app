import { useLocation } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { allFields } from "@/schemas/messageSchema";
import { actions, dispatcher } from "@/reducers/messageReducer";
import Form from "@/components/Form";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormField from "@/components/FormField";
import styles from "./styles/Chat.module.css";

export default function Chat() {
  const locationState = useLocation().state;
  if (!locationState) return location.replace("/");
  const [messages, dispatchMessages] = useReducer(dispatcher, {});
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  useEffect(() => {
    (async () => {
      let response = {};

      if (locationState.chat.id) {
        response = await requestHandler.get(
          `message/chat/${locationState.chat.id}`,
        );
        if (response.data)
          response.data = {
            messages: response.data,
            selected: {},
            chatId: locationState.chat.id,
          };
      } else {
        switch (locationState.chat.type) {
          case "user":
            response = await requestHandler.get(
              `chat/loggedUser/${sessionHandler.user().id}/otherUser/${locationState.id}`,
            );
            break;
          case "group":
            response = await requestHandler.get(
              `chat/user/${sessionHandler.user().id}/group/${locationState.id}`,
            );
            break;
        }
        if (response.data) {
          response.data = {
            messages: response.data.messages,
            selected: {},
            chatId: response.data.id,
          };
        }
      }

      dispatchMessages({ type: actions.load, payload: { response } });
    })();
  }, []);

  if (!messages.data)
    return (
      <Loader text={!messages.error ? "Getting messages..." : messages.error} />
    );

  allFields[2].value = sessionHandler.user().id;
  allFields[3].value = messages.data.chatId;

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div
          className={styles.data}
          onClick={() =>
            location.assign(
              `/profile/${locationState.chat.type}/${locationState.id}`,
            )
          }
        >
          <img
            src={locationState.image}
            alt={`${locationState.title} picture`}
          />
          <h3>{locationState.title}</h3>
        </div>
      </div>
      <div className={styles.messages}>
        {messages.data.messages.length ? (
          messages.data.messages.map((message) => (
            <Message
              key={message.id}
              data={message}
              styleJustifyContent={
                message.authorId === sessionHandler.user().id ? "end" : "start"
              }
              contextMenuHandler={(message) => {
                if (message.authorId === sessionHandler.user().id)
                  dispatchMessages({
                    type: actions.select,
                    payload: { selectedMessage: message },
                  });
              }}
            >
              {messages.data.selected.id === message.id && (
                <Menu
                  options={[
                    {
                      text: "Edit",
                      handler: () => editDialog.current.showModal(),
                    },
                    {
                      text: "Delete",
                      handler: () => deleteDialog.current.showModal(),
                    },
                  ]}
                />
              )}
            </Message>
          ))
        ) : (
          <div>{messages.message}</div>
        )}
        <Dialog ref={editDialog}>
          <FormField
            properties={allFields[0]}
            value={messages.data.selected.content || ""}
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
            properties={allFields[3]}
            value={messages.data.selected.id || ""}
          />
          <button onClick={() => removeHandler()}>Yes</button>
        </Dialog>
      </div>
      <div className={styles.footer}>
        <Form
          fields={allFields.filter((field) => field.id !== "id")}
          submit={{ text: "Send", handler: submitHandler }}
        />
      </div>
    </div>
  );

  async function submitHandler(message) {
    if (!messages.data.chatId && locationState.chat.type === "user") {
      const chat = await requestHandler.post({}, "chat");

      const loggedMember = await requestHandler.post(
        { chatId: chat.data.id, userId: sessionHandler.user().id },
        "chatMember",
      );
      if (loggedMember.error) return alert(loggedMember.error);
      const otherMember = await requestHandler.post(
        { chatId: chat.data.id, userId: locationState.id },
        "chatMember",
      );
      if (otherMember.error) return alert(otherMember.error);

      message.chatId = chat.data.id;
    }

    const send = await requestHandler.postFile(message, "message");
    if (send.error) return alert(send.error);

    dispatchMessages({
      type: actions.add,
      payload: {
        data: send.data,
      },
    });
  }
  async function editHandler() {
    const edited = await requestHandler.put(messages.data.selected, "message");
    if (edited) return alert(edited.error);

    dispatchMessages({
      type: actions.edit,
    });
    editDialog.current.close();
  }
  async function removeHandler() {
    const removed = await requestHandler.delete(
      messages.data.selected.id,
      "message",
    );
    if (removed) return alert(removed.error);

    dispatchMessages({
      type: actions.remove,
    });
    deleteDialog.current.close();
  }
}
