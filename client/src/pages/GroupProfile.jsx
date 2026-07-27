import { useParams } from "react-router-dom";
import { useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import Image from "@/components/Image";
import useGroup from "@/hooks/useGroup";
import List from "@/components/List";

export default function GroupProfile() {
  const id = useParams().id;
  const [group, setGroup] = useGroup(id);
  const [edit, setEdit] = useState(false);

  if (!group.data)
    return <Loader text={!group.error ? "Getting group..." : group.error} />;

  return (
    <div className="page">
      <Image src={group.data.image} alt={`${group.data.name} picture`} />
      <h2
        contentEditable={group.data.currentMember.role === "ADMIN"}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="name"
      >
        {group.data.name}
      </h2>
      <p
        contentEditable={group.data.currentMember.role === "ADMIN"}
        suppressContentEditableWarning={true}
        onInput={inputHandler}
        id="info"
      >
        {group.data.info}
      </p>
      {group.data.currentMember.role === "ADMIN" && (
        <button
          disabled={!edit}
          onClick={async () => await requestHandler.put(group.data, "group")}
        >
          Edit
        </button>
      )}
      <div>
        <h3>Members</h3>
        <List
          items={group.data.chats.chatMembers.map((member) => ({
            id: member.id,
            title: member.user.username,
            image: member.user.image,
            highlight: member.role === "ADMIN" ? "Admin" : "",
          }))}
        />
      </div>
    </div>
  );

  function inputHandler(event) {
    const key = event.currentTarget.id;
    const value = event.currentTarget.innerHTML;

    setGroup((prev) => {
      prev.data[key] = value;
      return prev;
    });
    setEdit(true);
  }
}
