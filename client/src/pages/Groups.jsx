import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";
import useGet from "@/hooks/useGet";

export default function Groups() {
  const [groups, setGroups] = useGet("group");

  if (!groups.data)
    return <Loader text={!groups.error ? "Getting groups..." : groups.error} />;

  return (
    <div className="page">
      <ProfileList
        items={groups.data.map((group) => ({
          id: group.id,
          image: group.image,
          title: group.name,
          content: group.info,
          chat: {
            type: "group",
            id: "",
          },
        }))}
      />
    </div>
  );
}
