import { useState } from "react";
import useChatList from "@/hooks/useChatList";
import sessionHandler from "@/handlers/sessionHandler";
import Loader from "@/components/Loader";
import ChatList from "@/components/ChatList";
import Chat from "@/components/Chat";

export default function UserIndex() {
  const [chats, setChats] = useChatList();
  const [currentChat, setCurrentChat] = useState(null);

  if (!chats.data)
    return <Loader text={!chats.error ? "Getting users..." : chats.error} />;

  return (
    <div className="page">
      {currentChat && sessionHandler.user() ? (
        <Chat data={currentChat} />
      ) : (
        <ChatList
          chats={chats.data.map((chat) => {
            let user = {};
            if (chat.firstUser.id !== sessionHandler.user().id)
              user = chat.firstUser;
            else if (chat.secondUser.id !== sessionHandler.user().id)
              user = chat.secondUser;

            return {
              id: chat.id,
              user: user,
              message: chat.messages[0],
            };
          })}
          clickHandler={(chat) => setCurrentChat(chat)}
        />
      )}
    </div>
  );
}
