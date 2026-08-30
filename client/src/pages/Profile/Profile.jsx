import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import useGet from "@/hooks/useGet";
import { edit } from "@/fieldsets/userFieldsets";
import Loader from "@/components/Loader/Loader";
import Profile from "@/components/Profile/Profile";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";

export default function UserProfile() {
  const [user, setUser] = useGet("user/profile");
  const credentialsDialog = useRef(null);

  document.title = `${import.meta.env.VITE_TITLE}: Profile`;

  if (!Object.keys(user).length || user.error)
    return <Loader text={user.error || "Getting user..."} />;

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
          isAllowed: true,
          handler: profileSubmitHandler,
        }}
        options={[
          {
            text: "Change credentials",
            handler: () => credentialsDialog.current.showModal(),
          },
        ]}
      />
      <Dialog name={"Change Credentials"} ref={credentialsDialog}>
        <Form
          fieldsets={[edit[1]]}
          initialData={{ id: user.id, username: user.username }}
          submit={{ text: "Enter", handler: dialogSubmitHandler }}
        />
      </Dialog>
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
