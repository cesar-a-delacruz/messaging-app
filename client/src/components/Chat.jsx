import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import styles from "./styles/Chat.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import Form from "./Form";
import Menu from "./Menu";
import { allFields } from "@/schemas/messageSchema";

export default function Chat({ senderId, receiverId }) {
  const [user, setUser] = useGet(`user/${receiverId}`);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});

  allFields[2].value = senderId;
  allFields[3].value = receiverId;

  useEffect(() => {
    (async () => {
      const allMessages = await requestHandler.get(
        `message/sender/${senderId}/receiver/${receiverId}`,
      );
      if (allMessages.error) allMessages.data = [];
      allMessages.data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

      setMessages(allMessages.data);
    })();
  }, [receiverId]);

  return (
    <div className={styles.chat} onClick={() => setSelectedMessage({})}>
      <div className={styles.header}>
        {user.data && (
          <div
            className={styles.data}
            onClick={() => location.assign(`profile/${receiverId}`)}
          >
            <img src={user.data.image} alt={`${user.data.fullname} picture`} />
            <h3>{user.data.fullname}</h3>
          </div>
        )}
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={styles.messageContainer}
            style={{
              justifyContent:
                message.senderId === sessionHandler.user().id ? "end" : "start",
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              if (message.senderId === sessionHandler.user().id)
                setSelectedMessage(message);
            }}
          >
            {selectedMessage.id === message.id && (
              <Menu
                options={[
                  { text: "Edit", handler: editHandler },
                  { text: "Delete", handler: deleteHandler },
                ]}
                message={message}
              />
            )}
            <div>
              <span>{message.createdAt}</span>
              {message.content && <p>{message.content}</p>}
              {message.attachment && <img src={message.attachment} />}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Form
          fields={allFields}
          submit={{ text: "Send", handler: submitHandler }}
        />
      </div>
    </div>
  );

  async function submitHandler(messageData) {
    const send = await requestHandler.postFile(messageData, "message");
    if (send.error) return alert(send.error);
    setMessages([...messages, send.data]);
  }
  async function editHandler(message) {}
  async function deleteHandler(message) {
    const removed = await requestHandler.delete(message.id, "message");
    if (removed) return alert(removed.error);
    setMessages(messages.filter((m) => m.id !== message.id));
  }
}
