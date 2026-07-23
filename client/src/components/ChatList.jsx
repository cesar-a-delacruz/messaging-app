import { useState, useEffect } from "react";
import styles from "./styles/ChatList.module.css";

export default function ChatList({ chats, clickHandler }) {
  const [list, setList] = useState(chats);

  useEffect(() => {
    setList(chats);
  }, [chats]);

  return (
    <div className={styles.list}>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => clickHandler(item)}
          className={styles.chat}
        >
          <img src={item.image} alt={`${item.username} picture`} />
          <div className={styles.text}>
            <h3>{item.username}</h3>
            <p>
              {item.message.content
                ? item.message.content
                : item.message.attachment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
