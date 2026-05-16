import { useEffect } from "react";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";

export default function GroupIndex() {
  const [groups, setGroups] = useGet("group");

  useEffect(() => {
    setTimeout(() => setGroups({ data: "data" }), 2000);
  }, []);

  if (!groups.data)
    return <Loader text={!groups.error ? "Getting groups..." : groups.error} />;

  return (
    <div className="page">
      <h2>Groups</h2>
      {groups.data}
    </div>
  );
}
