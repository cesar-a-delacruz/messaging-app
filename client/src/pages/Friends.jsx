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
          let item = {};
          if (chat.group) item = chat.group;
          else {
            for (const chatMember of chat.chatMembers) {
              if (chatMember.user.id !== sessionHandler.user().id)
                item = chatMember.user;
            }
          }

          return {
            id: chat.id,
            image: item.image,
            title: item.username ? item.username : item.name,
            content: chat.messages[0].content
              ? chat.messages[0].content
              : "attachment",
          };
        })}
        clickHandler={(chat) =>
          navigate(`/chat/${chat.id}`, {
            state: { ...chat, item: { id: chat.id, type: "chat" } },
          })
        }
      />
    </div>
  );
}
