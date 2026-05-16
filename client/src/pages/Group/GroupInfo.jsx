import { useEffect } from "react";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";

export default function GroupInfo() {
  const [group, setGroup] = useGet("group");

  useEffect(() => {
    setTimeout(() => setGroup({ data: "data" }), 2000);
  }, []);

  if (!group.data)
    return <Loader text={!group.error ? "Getting group..." : group.error} />;

  return (
    <div className="page">
      <h2>Group</h2>
      {group.data}
    </div>
  );
}
