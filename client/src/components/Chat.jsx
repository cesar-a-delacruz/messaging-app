import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";

export default function Chat({ senderId, receiverId }) {
  const [messages, setMessages] = useState({
    sender: [],
    receiver: [],
  });

  useEffect(() => {
    (async () => {
      let senderMessages = await requestHandler.get(
        `message/sender/${senderId}/receiver/${receiverId}`,
      );
      let receiverMessages = await requestHandler.get(
        `message/sender/${receiverId}/receiver/${senderId}`,
      );
      if (senderMessages.error) senderMessages.data = [];
      if (receiverMessages.error) receiverMessages.data = [];

      setMessages({
        sender: senderMessages.data,
        receiver: receiverMessages.data,
      });
    })();
  }, [receiverId]);

  return (
    <div>
      <div className="messages receiver">
        {messages.receiver.map((message) => (
          <div className="message">
            <span>{message.createdAt}</span>
            {message.content && <p>{message.content}</p>}
            {message.attachment && <img src={message.attachment} />}
          </div>
        ))}
      </div>
      <div className="messages sender">
        {messages.sender.map((message) => (
          <div className="message">
            <span>{message.createdAt}</span>
            {message.content && <p>{message.content}</p>}
            {message.attachment && <img src={message.attachment} />}
          </div>
        ))}
      </div>
    </div>
  );
}
