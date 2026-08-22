import { useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { create } from "@/schemas/groupFieldsets";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import Form from "@/components/Form/Form";
import ChatMembers from "@/components/ChatMembers/ChatMembers";

export default function NewGroup() {
  document.title = `${import.meta.env.VITE_TITLE}: New Group`;

  const [chatMembers, setChatMembers] = useState({
    members: [],
    selected: {},
  });
  const [users, setUsers] = useState([]);
  const usersDialog = useRef(null);
  return (
    <div className="page">
      <h2>New Group</h2>
      <Form
        fieldsets={create}
        initialData={{}}
        submit={{ text: "Create Group", handler: submitHandler }}
      />
      <button
        onClick={async () => {
          const response = await requestHandler.get("user/not/logged");
          if (response.data) setUsers(response.data);
          else alert(response.error);

          usersDialog.current.showModal();
        }}
      >
        Add members
      </button>

      <ChatMembers
        members={chatMembers.members}
        memberMenu={{
          render: true,
          buttonHandler: (member) =>
            setChatMembers({ ...chatMembers, selected: member }),
          options: [
            {
              text: "Change role",
              handler: changeMemberRoleHandler,
            },
            {
              text: "Remove member",
              handler: () => removeMemberHandler(),
            },
          ],
        }}
        addDialog={{
          render: true,
          ref: usersDialog,
          users: users,
          handler: addMemberHandler,
        }}
      />
    </div>
  );

  async function submitHandler(group) {
    if (!chatMembers.members.length)
      return alert("You must add at least one member.");

    const newGroup = await requestHandler.postFile(
      {
        ...removeEmptyFields(group),
        chatMembers: prepareChatMembers(chatMembers.members),
      },
      "group",
    );
    if (newGroup.error) return alert(newGroup.error);

    location.replace(`/profile/group/${newGroup.data.id}`);
  }

  async function addMemberHandler(newMembers) {
    setChatMembers((prev) => {
      const current = prev;
      newMembers = newMembers.map((member) => ({
        user: { ...member, username: member.title },
      }));
      current.members = [...prev.members, ...newMembers];

      return { ...current };
    });
  }
  async function changeMemberRoleHandler() {
    setChatMembers((prev) => {
      const current = prev;
      current.members = prev.members.map((member) => {
        if (member.user.id === chatMembers.selected.user.id)
          return {
            ...chatMembers.selected,
            role: chatMembers.selected.role === "ADMIN" ? "NONE" : "ADMIN",
          };

        return member;
      });
      current.selected = {};

      return { ...current };
    });
  }
  async function removeMemberHandler() {
    setChatMembers((prev) => {
      const current = prev;
      current.members = prev.members.filter(
        (member) => member.user.id !== chatMembers.selected.user.id,
      );
      current.selected = {};

      return { ...current };
    });
  }
}
