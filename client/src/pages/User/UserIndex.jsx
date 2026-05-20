import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import ChatList from "@/components/ChatList";

export default function UserIndex() {
  const [users, setUsers] = useGet("user");

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      <h2>Users</h2>
      <ChatList
        chats={users.data.map((user) => ({
          id: user.id,
          image: user.image,
          name: user.username,
          message: user.message,
        }))}
      />
    </div>
  );
}
