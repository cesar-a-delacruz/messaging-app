import sessionHandler from "@/handlers/sessionHandler";
import useChatList from "@/hooks/useChatList";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";

export default function MyChats() {
  const chats = useChatList();

  if (!chats.data)
    return <Loader text={!chats.error ? "Getting chats..." : chats.error} />;

  return (
    <div className="page">
      <ProfileList
        items={chats.data.map((chat) => {
          let profile = {};
          if (chat.group) profile = chat.group;
          else {
            for (const chatMember of chat.chatMembers) {
              if (chatMember.user.id !== sessionHandler.user().id)
                profile = chatMember.user;
            }
          }

          return {
            id: profile.id,
            image: profile.image,
            title: !chat.group ? profile.username : profile.name,
            content: chat.messages[0].content
              ? chat.messages[0].content
              : "attachment",
            chat: {
              type: !chat.group ? "user" : "group",
              id: chat.id,
            },
          };
        })}
      />
    </div>
  );
}
