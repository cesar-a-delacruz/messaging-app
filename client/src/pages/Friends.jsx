import useChatList from "@/hooks/useChatList";
import sessionHandler from "@/handlers/sessionHandler";
import Loader from "@/components/Loader";
import List from "@/components/List";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const navigate = useNavigate();
  const [chats, setChats] = useChatList();

  if (!chats.data)
    return <Loader text={!chats.error ? "Getting friends..." : chats.error} />;

  return (
    <div className="page">
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
        clickHandler={(chat) => navigate(`/chat/${chat.id}`, { state: chat })}
      />
    </div>
  );
}
