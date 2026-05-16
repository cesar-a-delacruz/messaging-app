import { useEffect } from "react";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";

export default function UserIndex() {
  const [users, setUsers] = useGet("user");

  useEffect(() => {
    setTimeout(() => setUsers({ data: "data" }), 2000);
  }, []);

  if (!users.data)
    return <Loader text={!users.error ? "Getting users..." : users.error} />;

  return (
    <div className="page">
      <h2>Users</h2>
      {users.data}
    </div>
  );
}
