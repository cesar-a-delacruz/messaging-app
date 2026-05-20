import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";

export default function ChatList({ chats }) {
  const [list, setList] = useState(chats);

  useEffect(() => {
    setList(chats);
  }, [chats]);

  return (
    <div onLoad={loadHandler}>
      {list.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={`${item.name} picture`} />
          <div>
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
      listWithMessages.push({ ...item, message: message.data.content });
    }

    setList(listWithMessages);
  }
}
