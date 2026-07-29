import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import Image from "@/components/Image";
import useGroup from "@/hooks/useGroup";
import List from "@/components/List";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";

export default function GroupProfile() {
  const id = useParams().id;
  const [group, setGroup] = useGroup(id);
  const [edit, setEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [users, setUsers] = useState([]);
  const usersDialog = useRef(null);

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
        <button
          onClick={async () => {
            const response = await requestHandler.get(
              `user/not/chat/${group.data.chats.id}`,
            );
            if (response.data) setUsers(response.data);
            usersDialog.current.showModal();
          }}
        >
          Add member
        </button>
        <Dialog ref={usersDialog}>
          <List
            items={users.map((user) => ({
              id: user.id,
              title: user.username,
              image: user.image,
            }))}
            clickHandler={async (user) => {
              const chatMember = {
                userId: user.id,
                chatId: group.data.chats.id,
              };

              const response = await requestHandler.post(
                chatMember,
                "chatMember",
              );

              if (response.data)
                setGroup((prev) => {
                  prev.data.chats.chatMembers.push(response.data);
                  return { ...prev };
                });
              usersDialog.current.close();
            }}
          />
        </Dialog>
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
                { text: "Remove member", handler: removeMemberHandler },
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
          return { ...prev };
        }
      }
    });
    setSelectedMember(null);
  }
  async function removeMemberHandler() {
    if (
      selectedMember.id === group.data.currentMember.id ||
      selectedMember.highlight === "ADMIN" ||
      group.data.currentMember.role !== "ADMIN"
    )
      return;
    const removeMember = await requestHandler.delete(
      selectedMember.id,
      "chatMember",
    );
    if (removeMember) return alert(removeMember.error);

    setGroup((prev) => {
      prev.data.chats.chatMembers = prev.data.chats.chatMembers.filter(
        (member) => member.id !== selectedMember.id,
      );
      return { ...prev };
    });
    setSelectedMember(null);
  }
}
