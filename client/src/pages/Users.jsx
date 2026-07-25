import Loader from "@/components/Loader";
import List from "@/components/List";
import useGet from "@/hooks/useGet";
import { useNavigate } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useGet(`user/not/${sessionHandler.user().id}`);

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      <List
        items={users.data.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
        }))}
        clickHandler={(user) =>
          navigate(`/chat`, {
            state: { ...user, id: "", item: { id: user.id, type: "user" } },
          })
        }
      />
    </div>
  );
}
