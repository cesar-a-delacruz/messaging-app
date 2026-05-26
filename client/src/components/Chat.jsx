import { useState, useEffect } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";

export default function Chat({ senderId, receiverId }) {
  const [user, setUser] = useGet(`user/${receiverId}`);
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
      <div className="user">
        {user.data && (
          <div className="data">
            <img src={user.data.image} alt={`${user.data.fullname} picture`} />
            <h3>{user.data.fullname}</h3>
          </div>
        )}
      </div>
      <div className="messages">
        <div className="receiver">
          {messages.receiver.map((message) => (
            <div className="message">
              <span>{message.createdAt}</span>
              {message.content && <p>{message.content}</p>}
              {message.attachment && <img src={message.attachment} />}
            </div>
          ))}
        </div>
        <div className="sender">
          {messages.sender.map((message) => (
            <div className="message">
              <span>{message.createdAt}</span>
              {message.content && <p>{message.content}</p>}
              {message.attachment && <img src={message.attachment} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
