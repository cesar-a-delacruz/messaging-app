import { useState, useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import styles from "./styles/Chat.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import { allFields } from "@/schemas/messageSchema";
import Form from "@/components/Form";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import Loader from "@/components/Loader";
import { useLocation } from "react-router-dom";
import useMessages from "@/hooks/useMessages";
import Message from "@/components/Message";
import FormField from "@/components/FormField";

export default function Chat() {
  const locationState = useLocation().state;
  if (!locationState) return location.replace("/");
  const [messages, setMessages] = useMessages(locationState);
  const [selectedMessage, setSelectedMessage] = useState({});
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  allFields[2].value = sessionHandler.user().id;
  allFields[3].value = messages.chatId;

  if (!messages.data)
    return (
      <Loader text={!messages.error ? "Getting messages..." : messages.error} />
    );

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
        {messages.data.length ? (
          messages.data.map((message) => (
            <Message
              key={message.id}
              data={message}
              styleJustifyContent={
                message.authorId === sessionHandler.user().id ? "end" : "start"
              }
              contextMenuHandler={(message) => {
                if (message.authorId === sessionHandler.user().id)
                  setSelectedMessage(message);
              }}
            >
              {selectedMessage.id === message.id && (
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
            value={selectedMessage.content || ""}
            changeHandler={(id, value) =>
              setSelectedMessage({ ...selectedMessage, [id]: value })
            }
          />
          <button onClick={() => editHandler(selectedMessage)}>Edit</button>
        </Dialog>
        <Dialog ref={deleteDialog}>
          <p>Are you sure you want to delete this message?</p>
          <FormField
            properties={allFields[3]}
            value={selectedMessage.id || ""}
          />
          <button onClick={() => deleteHandler(selectedMessage)}>Yes</button>
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
    if (!messages.chatId && locationState.chat.type === "user") {
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

    setMessages({ ...messages, data: [...messages.data, send.data] });
  }
  async function editHandler(message) {
    const messageContent = { id: message.id, content: message.content };
    const edited = await requestHandler.put(messageContent, "message");
    if (edited) return alert(edited.error);

    setMessages({
      ...messages,
      data: messages.data.map((m) => {
        if (m.id == messageContent.id) m.content = messageContent.content;
        return m;
      }),
    });
    editDialog.current.close();
  }
  async function deleteHandler(message) {
    const removed = await requestHandler.delete(message.id, "message");
    if (removed) return alert(removed.error);

    setMessages({
      ...messages,
      data: messages.data.filter((m) => m.id !== message.id),
    });
    deleteDialog.current.close();
  }
}
