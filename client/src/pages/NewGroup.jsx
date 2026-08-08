import { useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { allFields } from "@/schemas/groupSchema";
import Form from "@/components/Form";
import Dialog from "@/components/Dialog";
import ProfileList from "@/components/ProfileList";
import Member from "@/components/Member";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";

export default function NewGroup() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersDialog = useRef(null);

  return (
    <div className="page">
      <h2>New Group</h2>
      <Form
        fields={allFields}
        submit={{ text: "Create Group", handler: submitHandler }}
      />
      <h3>Members</h3>
      <button
        onClick={async () => {
          const response = await requestHandler.get(
            `user/not/${sessionHandler.user().id}`,
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
        <button onClick={() => usersDialog.current.close()}>Add all</button>
      </Dialog>
      <div>
        {selectedUsers.map((user) => (
          <Member key={user.id} data={user} contextMenuHandler={() => {}} />
        ))}
      </div>
    </div>
  );

  async function submitHandler(group) {
    if (!selectedUsers.length)
      return alert("You must add at least one member.");

    const admin = {
      id: sessionHandler.user().id,
      role: "ADMIN",
    };

    const newGroup = await requestHandler.postFile(
      {
        ...removeEmptyFields(group),
        chatMembers: prepareChatMembers([...selectedUsers, admin]),
      },
      "group",
    );
    if (newGroup.error) return alert(newGroup.error);

    location.replace(`/profile/group/${newGroup.data.id}`);
  }
}
