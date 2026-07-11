import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";
import styles from "./styles/ChatList.module.css";

export default function ChatList({ chats, clickHandler }) {
  const [list, setList] = useState(chats);

  useEffect(() => {
    setList(chats);
  }, [chats]);

  return (
    <div onLoad={loadHandler} className={styles.list}>
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => clickHandler(item.id)}
          className={styles.chat}
        >
          <img src={item.image} alt={`${item.name} picture`} />
          <div className={styles.text}>
            <h3>{item.name}</h3>
            <p>{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );

  async function loadHandler() {
    const listWithMessages = [];

    for (const item of list) {
      const message = await requestHandler.get(`message/latest/${item.id}`);
      if (message.error) listWithMessages.push({ ...item, message: "" });
      else listWithMessages.push({ ...item, message: message.data.content });
    }

    setList(listWithMessages);
  }
}
