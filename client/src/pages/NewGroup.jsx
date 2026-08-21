import { useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { create } from "@/schemas/groupFieldsets";
import Form from "@/components/Form/Form";
import Dialog from "@/components/Dialog/Dialog";
import ProfileList from "@/components/ProfileList/ProfileList";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";

export default function NewGroup() {
  document.title = `${import.meta.env.VITE_TITLE}: New Group`;

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersDialog = useRef(null);

  return (
    <div className="page">
      <h2>New Group</h2>
      <Form
        fieldsets={create}
        initialData={{}}
        submit={{ text: "Create Group", handler: submitHandler }}
      />
      <h3>Members</h3>
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
          <div key={user.id}>
            <Image src={user.image} alt={`${user.title} picture`} />
            <div>
              <h3>
                {user.title} <span>{role === "ADMIN" ? "ADMIN" : ""}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  async function submitHandler(group) {
    if (!selectedUsers.length)
      return alert("You must add at least one member.");

    const newGroup = await requestHandler.postFile(
      {
        ...removeEmptyFields(group),
        chatMembers: prepareChatMembers(selectedUsers),
      },
      "group",
    );
    if (newGroup.error) return alert(newGroup.error);

    location.replace(`/profile/group/${newGroup.data.id}`);
  }
}
