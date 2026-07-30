import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";
import useGet from "@/hooks/useGet";
import sessionHandler from "@/handlers/sessionHandler";

export default function Users() {
  const [users, setUsers] = useGet(`user/not/${sessionHandler.user().id}`);

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      <ProfileList
        items={users.data.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
          chat: {
            type: "user",
            id: "",
          },
        }))}
      />
    </div>
  );
}
