import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import { edit } from "@/fieldsets/userFieldsets";
import Loader from "@/components/Loader/Loader";
import Profile from "@/components/Profile/Profile";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";

export default function UserProfile() {
  const id = useParams().id;
  const [user, setUser] = useGet(`user/${id ? id : "profile"}`);
  const navigate = useNavigate();
  const credentialsDialog = useRef(null);

  document.title = `${import.meta.env.VITE_TITLE}: ${user.fullname ? user.fullname : "User"}'s profile`;

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  const isLoggedUserProfile = !id;

  return (
    <div className="page">
      <Profile
        form={{
          fieldset: edit[0],
          data: {
            image: user.image,
            fullname: user.fullname,
            bio: user.bio,
          },
        }}
        edit={{
          isAllowed: isLoggedUserProfile,
          handler: profileSubmitHandler,
        }}
        options={[
          {
            text: "Change credentials",
            handler: () => credentialsDialog.current.showModal(),
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
      {isLoggedUserProfile && (
        <Dialog name={"Change Credentials"} ref={credentialsDialog}>
          <Form
            fieldsets={[edit[1]]}
            initialData={{ id: user.id, username: user.username }}
            submit={{ text: "Enter", handler: dialogSubmitHandler }}
          />
        </Dialog>
      )}
    </div>
  );

  async function profileSubmitHandler(data) {
    data = { ...user, ...data };
    await requestHandler.put(data, "user");
    setUser(data);
  }
  async function dialogSubmitHandler(data) {
    const newCredentials = await requestHandler.put(data, "auth/credentials");
    if (newCredentials) return alert(newCredentials.error);

    credentialsDialog.current.close();
  }
}
