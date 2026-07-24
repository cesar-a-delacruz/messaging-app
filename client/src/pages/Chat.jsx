import { useState, useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import styles from "./styles/Chat.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import { allFields } from "@/schemas/messageSchema";
import Form from "@/components/Form";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const location = useLocation().state;
  const [messages, setMessages] = useGet(`message/chat/${location.id}`);
  const [selectedMessage, setSelectedMessage] = useState({});
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  allFields[2].value = sessionHandler.user().id;
  allFields[3].value = location.id;

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div
          className={styles.data}
          onClick={() => location.assign(`profile/${location.userId}`)}
        >
          <img src={location.image} alt={`${location.title} picture`} />
          <h3>{location.title}</h3>
        </div>
      </div>
      <div className={styles.messages}>
        {messages.data ? (
          messages.data.map((message) => (
            <div
              key={message.id}
              className={styles.messageContainer}
              style={{
                justifyContent:
                  message.authorId === sessionHandler.user().id
                    ? "end"
                    : "start",
              }}
              onContextMenu={(e) => {
                e.preventDefault();
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
              <div>
                <span>{message.createdAt}</span>
                {message.content && <p>{message.content}</p>}
                {message.attachment && <img src={message.attachment} />}
              </div>
            </div>
          ))
        ) : (
          <div>Start the converstion ;)</div>
        )}
        <Dialog ref={editDialog}>
          <input
            type="text"
            id="content"
            value={selectedMessage.content || ""}
            onChange={(e) => {
              const newContent = e.currentTarget.value;
              setSelectedMessage({ ...selectedMessage, content: newContent });
            }}
          />
          <button onClick={() => editHandler(selectedMessage)}>Edit</button>
        </Dialog>
        <Dialog ref={deleteDialog}>
          <p>Are you sure you want to delete this message?</p>
          <input type="hidden" id="id" value={selectedMessage.id || ""} />
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
    let chat = {};
    if (!location.id) {
      const newChat = {
        firstUser: sessionHandler.user().id,
        secondUser: location.userId,
      };
      chat = await requestHandler.post(newChat, "chat");
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
