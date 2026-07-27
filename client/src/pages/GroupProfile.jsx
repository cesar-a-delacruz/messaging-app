import { useParams } from "react-router-dom";
import { useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import Image from "@/components/Image";
import useGroup from "@/hooks/useGroup";
import List from "@/components/List";
import Menu from "@/components/Menu";

export default function GroupProfile() {
  const id = useParams().id;
  const [group, setGroup] = useGroup(id);
  const [edit, setEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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
            highlight: member.role === "ADMIN" ? "ADMIN" : "",
            userId: member.user.id,
          }))}
          clickHandler={(member) => setSelectedMember(member)}
        >
          {selectedMember && (
            <Menu
              options={[
                { text: "Change role", handler: changeRoleHandler },
                { text: "Remove member", handler: () => {} },
                {
                  text: "See profile",
                  handler: () =>
                    location.assign(`/profile/user/${selectedMember.userId}`),
                },
              ]}
            />
          )}
        </List>
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

  async function changeRoleHandler() {
    if (selectedMember.id === group.data.currentMember.id) return;
    const member = {
      id: selectedMember.id,
      role: selectedMember.highlight === "ADMIN" ? "NONE" : "ADMIN",
    };
    const changeRole = await requestHandler.put(member, "chatMember");
    if (changeRole) return alert(changeRole.error);

    setGroup((prev) => {
      for (let i = 0; i < prev.data.chats.chatMembers.length; i++) {
        if (prev.data.chats.chatMembers[i].id === selectedMember.id) {
          prev.data.chats.chatMembers[i].role = member.role;
          4;
          return { ...prev };
        }
      }
    });
    setSelectedMember(null);
  }
}
