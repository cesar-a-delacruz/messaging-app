import useChatList from "@/hooks/useChatList";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";
import { useNavigate } from "react-router-dom";

export default function MyChats() {
  const chats = useChatList();
  const navigate = useNavigate();

  if (!Object.keys(chats).length || chats.error)
    return <Loader text={chats.error || "Getting chats..."} />;

  return (
    <div className="page">
      <ProfileList
        items={chats.map((chat) => ({
          id: chat.profile.id,
          image: chat.profile.image,
          title: !chat.group ? chat.profile.username : chat.profile.name,
          content: chat.messages[0].content
            ? chat.messages[0].content
            : "attachment",
          chat: {
            type: !chat.group ? "user" : "group",
            id: chat.id,
          },
        }))}
        clickHandler={(chat) => navigate("/chat", { state: chat })}
      />
    </div>
  );
}
