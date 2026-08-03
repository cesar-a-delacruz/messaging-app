import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList";

export default function Groups() {
  const [groups] = useGet("group");

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
        clickHandler={(item) => location.assign(`/profile/group/${item.id}`)}
      />
    </div>
  );
}
