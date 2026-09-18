import styles from "./ChatMembers.module.css";
import { useEffect, useState } from "react";
import Dialog from "../Dialog/Dialog";
import Menu from "../Menu/Menu";
import ProfileList from "../ProfileList/ProfileList";
import Image from "../Image/Image";

export default function ChatMembers({
  members,
  selectionHandler,
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
        {members.map((member) => {
          if (member.user)
            return (
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
                <Menu selectionHandler={() => selectionHandler(member)} />
              </div>
            );
        })}
      </div>

      {addDialog.render && (
        <Dialog name={"Add members"} ref={addDialog.ref}>
          <ProfileList
            profiles={addDialog.users
              .map((user) => {
                if (!selectedUsers.length) return user;
                for (const selected in selectedUsers) {
                  if (selected.id !== user.id) return user;
                }
              })
              .map((user) => ({
                id: user.id,
                image: user.image,
                title: user.username,
              }))}
            selectable={true}
            clickHandler={async (user) => {
              switch (user.action) {
                case undefined:
                case "add":
                  return setSelectedUsers([...selectedUsers, user.profile]);
                case "remove":
                  return setSelectedUsers((prev) => [
                    ...prev.filter((p) => p.id !== user.profile.id),
                  ]);
              }
            }}
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
