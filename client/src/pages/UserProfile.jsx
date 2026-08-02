import { useParams } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile";

export default function UserProfile() {
  const id = useParams().id;
  const [user] = useGet(`user/${id ? id : sessionHandler.user().id}`);

  if (!user.data)
    return <Loader text={!user.error ? "Getting user..." : user.error} />;

  return (
    <div className="page">
      <Profile
        initialData={{
          image: { id: "image", value: user.data.image },
          title: { id: "fullname", value: user.data.fullname },
          subtitle: { id: "username", value: user.data.username },
          content: { id: "bio", value: user.data.bio },
        }}
        contentEditable={user.data.id === sessionHandler.user().id}
        editHandler={async (data) =>
          await requestHandler.put({ ...data, id: user.data.id }, "user")
        }
      />
    </div>
  );
}
