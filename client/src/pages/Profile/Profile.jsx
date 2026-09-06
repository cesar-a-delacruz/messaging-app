import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import { edit, remove } from "@/fieldsets/userFieldsets";
import Loader from "@/components/Loader/Loader";
import Profile from "@/components/Profile/Profile";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";
import ProfileContext from "@/contexts/ProfileContext";
import sessionHandler from "@/handlers/sessionHandler";

export default function UserProfile() {
  const [user, setUser] = useGet("user/profile");
  const credentialsDialog = useRef(null);
  const removeDialog = useRef(null);

  document.title = `${import.meta.env.VITE_TITLE}: Profile`;

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

  return (
    <div className="page">
      <ProfileContext
        value={{
          data: {
            image: user.image,
            fullname: user.fullname,
            bio: user.bio,
          },
          fieldset: edit[0],
          setData: setUser,
        }}
      >
        <Profile
          readOnly={false}
          editHandler={profileEditHandler}
          options={[
            {
              text: "Change credentials",
              handler: () => credentialsDialog.current.showModal(),
            },
            {
              text: "Delete Account",
              handler: () => removeDialog.current.showModal(),
            },
          ]}
        />
      </ProfileContext>

      <Dialog name={"Change Credentials"} ref={credentialsDialog}>
        <Form
          fieldsets={[edit[1]]}
          initialData={{ id: user.id, username: user.username }}
          submit={{
            text: "Enter",
            handler: dialogSubmitHandler,
            disable: true,
          }}
        />
      </Dialog>
      <Dialog name={"Delete Account"} ref={removeDialog}>
        <p>Are you sure you want to delete your account?</p>
        <Form
          fieldsets={remove}
          initialData={{ id: user.id }}
          submit={{
            text: "Yes",
            handler: profileRemoveHandler,
            disable: false,
          }}
        />
      </Dialog>
    </div>
  );

  async function profileEditHandler(data) {
    data = { ...user, ...data };
    await requestHandler.put(data, "user");
    setUser(data);
  }
  async function dialogSubmitHandler(data) {
    const newCredentials = await requestHandler.put(data, "auth/credentials");
    if (newCredentials) return alert(newCredentials.error);

    credentialsDialog.current.close();
  }
  async function profileRemoveHandler(data) {
    await requestHandler.delete(data.id, "user");
    await sessionHandler.logout();
  }
}
