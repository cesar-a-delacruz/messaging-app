import { useState } from "react";
import sessionHandler from "@/handlers/sessionHandler";
import Loader from "@/components/Loader";
import List from "@/components/List";
import useGet from "@/hooks/useGet";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
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
            navigate(`/chat/new`, {
              state: { ...user, id: "", userId: user.id },
            })
          }
        />
      )}
    </div>
  );
}
