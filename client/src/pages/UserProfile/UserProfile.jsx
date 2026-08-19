import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import { changeCredentialsFields } from "@/schemas/userSchema";
import Loader from "@/components/Loader";
import Profile from "@/components/Profile";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";

export default function UserProfile() {
  document.title = `${import.meta.env.VITE_TITLE}: Profile`;

  const id = useParams().id;
  const [user] = useGet(`user/${id ? id : "profile"}`);
  const navigate = useNavigate();
  const credentialsDialog = useRef(null);

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  const isLoggedUserProfile = !id;

  changeCredentialsFields[0].fields[0].value = user.id;
  changeCredentialsFields[0].fields[1].value = user.username;

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
            fieldsets={changeCredentialsFields}
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

    location.replace("/profile/user");
  }
}
