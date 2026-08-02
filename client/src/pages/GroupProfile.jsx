import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { allFields } from "@/schemas/chatMemberSchema";
import Loader from "@/components/Loader";
import useGroup from "@/hooks/useGroup";
import Member from "@/components/Member";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import ProfileList from "@/components/ProfileList";
import FormField from "@/components/FormField";
import Profile from "@/components/Profile";

export default function GroupProfile() {
  const id = useParams().id;
  const [group, setGroup] = useGroup(id);
  const [selectedMember, setSelectedMember] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersDialog = useRef(null);
  const removeDialog = useRef(null);

  if (!group.data)
    return <Loader text={!group.error ? "Getting group..." : group.error} />;

  return (
    <div className="page">
      <Profile
        initialData={{
          image: { id: "image", value: group.data.image },
          title: { id: "name", value: group.data.name },
          content: { id: "info", value: group.data.info },
        }}
        contentEditable={group.data.currentMember.role === "ADMIN"}
        editHandler={async (data) =>
          await requestHandler.put({ ...data, id: group.data.id }, "group")
        }
      />
      <div>
        <h3>Members</h3>
        <button
          onClick={async () => {
            if (group.data.currentMember.role !== "ADMIN") return;

            const response = await requestHandler.get(
              `user/not/chat/${group.data.chats.id}`,
            );
            if (response.data) setUsers(response.data);
            else alert(response.error);

            usersDialog.current.showModal();
          }}
        >
          Add members
        </button>
        <Dialog ref={usersDialog}>
          <ProfileList
            items={users.map((user) => ({
              id: user.id,
              image: user.image,
              title: user.username,
            }))}
            clickHandler={async (user) =>
              setSelectedUsers([...selectedUsers, user])
            }
          />
          <button onClick={() => createMemberHandler()}>Add all</button>
        </Dialog>
        <div>
          {group.data.chats.chatMembers.map((member) => (
            <Member
              key={member.id}
              data={{
                ...member,
                username: member.user.username,
                image: member.user.image,
              }}
              contextMenuHandler={(member) => setSelectedMember(member)}
            >
              {selectedMember.id === member.id && (
                <Menu
                  options={[
                    { text: "Change role", handler: changeRoleHandler },
                    {
                      text: "Remove member",
                      handler: () => removeDialog.current.showModal(),
                    },
                    {
                      text: "See profile",
                      handler: () =>
                        location.assign(
                          `/profile/user/${selectedMember.user.id}`,
                        ),
                    },
                  ]}
                />
              )}
            </Member>
          ))}
        </div>
        <Dialog ref={removeDialog}>
          <p>Are you sure you want to remove this member?</p>
          <FormField
            properties={allFields[0]}
            value={selectedMember.id || ""}
          />
          <button onClick={() => removeMemberHandler()}>Yes</button>
        </Dialog>
      </div>
    </div>
  );

  async function createMemberHandler() {
    if (group.data.currentMember.role !== "ADMIN") return;

    let chatMembers = [];
    for (const user of selectedUsers) {
      chatMembers.push({
        userId: user.id,
        chatId: group.data.chats.id,
      });
    }

    const response = await requestHandler.post(
      {
        chatMembers: JSON.stringify(chatMembers),
      },
      "chatMember",
    );

    if (response.data)
      setGroup((prev) => {
        prev.data.chats.chatMembers = [
          ...prev.data.chats.chatMembers,
          ...response.data,
        ];
        return { ...prev };
      });
    setSelectedUsers([]);
    usersDialog.current.close();
  }
  async function changeRoleHandler() {
    if (selectedMember.id === group.data.currentMember.id) return;
    const member = {
      id: selectedMember.id,
      role: selectedMember.role === "ADMIN" ? "NONE" : "ADMIN",
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
    setSelectedMember({});
  }
  async function removeMemberHandler() {
    if (
      selectedMember.id === group.data.currentMember.id ||
      selectedMember.role === "ADMIN" ||
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
    setSelectedMember({});
    removeDialog.current.close();
  }
}
