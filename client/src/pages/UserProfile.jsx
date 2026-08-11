import { useParams, useNavigate } from "react-router-dom";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile";
import removeEmptyFields from "@/utils/js/removeEmptyFields";

export default function UserProfile() {
  const id = useParams().id;
  const [user] = useGet(`user/${id ? id : "profile"}`);
  const navigate = useNavigate();

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  const isLoggedUserProfile = !id;

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
          handler: async (data) => {
            data.id = user.id;
            await requestHandler.put(removeEmptyFields(data), "user");
          },
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
