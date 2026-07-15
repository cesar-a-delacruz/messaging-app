import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import styles from "./styles/Chat.module.css";
import sessionHandler from "@/handlers/sessionHandler";

export default function Chat({ senderId, receiverId }) {
  const [user, setUser] = useGet(`user/${receiverId}`);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const allMessages = await requestHandler.get(
        `message/sender/${senderId}/receiver/${receiverId}`,
      );
      if (allMessages.error) allMessages.data = [];
      allMessages.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setMessages(allMessages.data);
    })();
  }, [receiverId]);

  return (
    <div className={styles.chat}>
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
          >
            <div>
              <span>{message.createdAt}</span>
              {message.content && <p>{message.content}</p>}
              {message.attachment && <img src={message.attachment} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
