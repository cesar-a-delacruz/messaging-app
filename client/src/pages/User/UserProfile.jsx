import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import { useParams } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";

export default function UserProfile() {
  const userId = useParams().userId;
  const [user, setUser] = useGet(
    `user/${userId ? userId : sessionHandler.user().id}`,
  );

  if (!user.data)
    return <Loader text={!user.error ? "Getting user..." : user.error} />;

  return (
    <div className="page">
      <img src={user.data.image} alt={`${user.data.fullname} picture`} />
      <h2>{user.data.fullname}</h2>
      <span>{user.data.username}</span>
      <p>{user.data.bio}</p>
    </div>
  );
}
