import { useState, useEffect } from "react";

export default function ChatList({ chats }) {
  const [list, setList] = useState(chats);

  useEffect(() => {
    setList(chats);
  }, [chats]);

  return (
    <div>
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
}
