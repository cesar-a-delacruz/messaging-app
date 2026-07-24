import { useState } from "react";
import useChatList from "@/hooks/useChatList";
import sessionHandler from "@/handlers/sessionHandler";
import Loader from "@/components/Loader";
import List from "@/components/List";
import Chat from "@/components/Chat";

export default function Friends() {
  const [chats, setChats] = useChatList();
  const [currentChat, setCurrentChat] = useState(null);

  if (!chats.data)
    return <Loader text={!chats.error ? "Getting users..." : chats.error} />;

  return (
    <div className="page">
      {currentChat && sessionHandler.user() ? (
        <Chat data={currentChat} />
      ) : (
        <List
          items={chats.data.map((chat) => {
            let user = {};
            if (chat.firstUser.id !== sessionHandler.user().id)
              user = chat.firstUser;
            else if (chat.secondUser.id !== sessionHandler.user().id)
              user = chat.secondUser;

            return {
              id: chat.id,
              image: user.image,
              title: user.username,
              content: chat.messages[0].content
                ? chat.messages[0].content
                : "attachment",
              userId: user.id,
            };
          })}
          clickHandler={(chat) => setCurrentChat(chat)}
        />
      )}
    </div>
  );
}
