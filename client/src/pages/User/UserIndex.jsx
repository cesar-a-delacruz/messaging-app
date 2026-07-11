import useGet from "@/hooks/useGet";
import { useState } from "react";
import Loader from "@/components/Loader";
import ChatList from "@/components/ChatList";
import Chat from "@/components/Chat";
import sessionHandler from "@/handlers/sessionHandler";

export default function UserIndex() {
  const [users, setUsers] = useGet("user");
  const [currentUser, setCurrentUser] = useState(null);

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      {currentUser && sessionHandler.user() ? (
        <Chat senderId={sessionHandler.user().id} receiverId={currentUser} />
      ) : (
        <ChatList
          chats={users.data.map((user) => ({
            id: user.id,
            image: user.image,
            name: user.username,
            message: user.message,
          }))}
          clickHandler={(userId) => setCurrentUser(userId)}
        />
      )}
    </div>
  );
}
