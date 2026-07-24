import { useState } from "react";
import sessionHandler from "@/handlers/sessionHandler";
import Loader from "@/components/Loader";
import List from "@/components/List";
import Chat from "@/components/Chat";
import useGet from "@/hooks/useGet";

export default function Users() {
  const [users, setUsers] = useGet("user");
  const [currentChat, setCurrentChat] = useState(null);

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      {currentChat && sessionHandler.user() ? (
        <Chat data={currentChat} />
      ) : (
        <List
          items={users.data.map((user) => ({
            id: user.id,
            image: user.image,
            title: user.username,
            content: "",
          }))}
          clickHandler={(user) =>
            setCurrentChat({ ...user, id: "", userId: user.id })
          }
        />
      )}
    </div>
  );
}
