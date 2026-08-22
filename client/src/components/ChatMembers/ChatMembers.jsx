import { useEffect, useState } from "react";
import Dialog from "../Dialog/Dialog";
import Menu from "../Menu/Menu";
import ProfileList from "../ProfileList/ProfileList";
import Image from "../Image/Image";

export default function ChatMembers({
  members,
  memberMenu = { render, options, buttonHandler },
  addDialog = { render, ref, users, handler },
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [members]);

  return (
    <div>
      <h3>Members</h3>
      <div>
        {members.map((member) => (
          <div key={member.user.id}>
            <Image
              src={member.user.image}
              alt={`${member.user.username} picture`}
            />
            <div>
              <h3>
                {member.user.username}{" "}
                <span>{member.role === "ADMIN" ? "ADMIN" : ""}</span>
              </h3>
            </div>
            {memberMenu.render && (
              <Menu
                options={memberMenu.options}
                buttonHandler={() => memberMenu.buttonHandler(member)}
              />
            )}
          </div>
        ))}
      </div>

      {addDialog.render && (
        <Dialog ref={addDialog.ref}>
          <ProfileList
            items={addDialog.users.map((user) => ({
              id: user.id,
              image: user.image,
              title: user.username,
            }))}
            clickHandler={async (user) =>
              setSelectedUsers([...selectedUsers, user])
            }
          />
          <button
            onClick={() => {
              addDialog.handler(selectedUsers);
              addDialog.ref.current.close();
            }}
          >
            Add all
          </button>
        </Dialog>
      )}
    </div>
  );
}
