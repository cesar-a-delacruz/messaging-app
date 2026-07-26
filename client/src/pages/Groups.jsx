import Loader from "@/components/Loader";
import List from "@/components/List";
import useGet from "@/hooks/useGet";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useGet("group");
  if (!groups.data)
    return <Loader text={!groups.error ? "Getting groups..." : groups.error} />;

  return (
    <div className="page">
      <List
        items={groups.data.map((group) => ({
          id: group.id,
          image: group.image,
          title: group.name,
          content: group.info,
          profile: { type: "group", id: group.id },
        }))}
        clickHandler={(group) =>
          navigate(`/chat`, {
            state: { ...group, id: "", item: { id: group.id, type: "group" } },
          })
        }
      />
    </div>
  );
}
