import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import { profileFields } from "@/schemas/userSchema";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile/Profile";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";

export default function UserProfile() {
  document.title = `${import.meta.env.VITE_TITLE}: User Profile`;

  const id = useParams().id;
  const [user] = useGet(`user/${id ? id : "profile"}`);
  const navigate = useNavigate();
  const credentialsDialog = useRef(null);

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  const isLoggedUserProfile = !id;

  profileFields[0].fields[0].value = user.image;
  profileFields[0].fields[1].value = user.fullname;
  profileFields[0].fields[2].value = user.bio;

  profileFields[1].fields[0].value = user.id;
  profileFields[1].fields[1].value = user.username;

  return (
    <div className="page">
      <Profile
        initialData={[profileFields[0]]}
        edit={{
          isAllowed: isLoggedUserProfile,
          handler: async (data) => {
            data = { ...user, ...data };
            await requestHandler.put(removeEmptyFields(data), "user");
          },
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
            fieldsets={[profileFields[1]]}
            submit={{ text: "Enter", handler: submitHandler }}
          />
        </Dialog>
      )}
    </div>
  );

  async function submitHandler(data) {
    const newCredentials = await requestHandler.put(
      removeEmptyFields(data),
      "auth/credentials",
    );
    if (newCredentials) return alert(newCredentials.error);

    credentialsDialog.current.close();
  }
}
