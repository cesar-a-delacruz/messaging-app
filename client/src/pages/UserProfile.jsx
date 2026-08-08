import { useParams, useNavigate } from "react-router-dom";
import sessionHandler from "@/handlers/sessionHandler";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile";

export default function UserProfile() {
  const id = useParams().id;
  const [user] = useGet(`user/${id ? id : sessionHandler.user().id}`);
  const navigate = useNavigate();

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  const isLoggedUserProfile = user.id === sessionHandler.user().id;

  return (
    <div className="page">
      <Profile
        initialData={{
          image: { id: "image", value: user.image },
          title: { id: "fullname", value: user.fullname },
          subtitle: { id: "username", value: user.username },
          content: { id: "bio", value: user.bio },
        }}
        edit={{
          isAllowed: isLoggedUserProfile,
          handler: async (data) =>
            await requestHandler.put({ ...data, id: user.id }, "user"),
        }}
        options={[
          {
            text: "Change credentials",
            handler: () =>
              navigate("/credentials", {
                state: {
                  id: user.id,
                  username: user.username,
                },
              }),
            hide: !isLoggedUserProfile,
          },
          {
            text: "View chat",
            handler: async () =>
              navigate(`/chat`, {
                state: {
                  id: user.id,
                  image: user.image,
                  title: user.name,
                  chat: {
                    type: "user",
                    id: "",
                  },
                },
              }),
            hide: isLoggedUserProfile,
          },
        ]}
      />
    </div>
  );
}
