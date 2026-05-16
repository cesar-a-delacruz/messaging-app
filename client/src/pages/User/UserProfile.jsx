import { useEffect } from "react";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";

export default function UserProfile() {
  const [user, setUser] = useGet("user");

  useEffect(() => {
    setTimeout(() => setUser({ data: "data" }), 2000);
  }, []);

  if (!user)
    return <Loader text={!user.error ? "Getting user..." : user.error} />;

  return (
    <div className="page">
      <h2>User</h2>
      {user.data}
    </div>
  );
}
