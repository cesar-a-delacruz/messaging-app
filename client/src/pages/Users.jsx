import sessionHandler from "@/handlers/sessionHandler";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";

export default function Users() {
  const [users] = useGet(`user/not/${sessionHandler.user().id}`);

  if (!Object.keys(users).length || users.error)
    return <Loader text={users.error || "Getting users..."} />;

  return (
    <div className="page">
      <ProfileList
        items={users.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
          chat: {
            type: "user",
            id: "",
          },
        }))}
        clickHandler={(item) => location.assign(`/profile/user/${item.id}`)}
      />
    </div>
  );
}
