import styles from "./ChatMembers.module.css";
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
    <>
      <h3>Members</h3>
      <div className={styles.members}>
        {members.map((member) => (
          <div key={member.user.id} className={styles.member}>
            <Image
              src={member.user.image}
              alt={`${member.user.username} picture`}
            />
            <div>
              <h4>
                {member.user.username}
                {member.role === "ADMIN" && <span>ADMIN</span>}
              </h4>
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
        <Dialog name={"Add members"} ref={addDialog.ref}>
          <ProfileList
            profiles={addDialog.users.map((user) => ({
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
    </>
  );
}
