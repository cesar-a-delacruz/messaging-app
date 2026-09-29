import { useState } from "react";
import Dialog from "@/components/Dialog/Dialog";
import AddMembers from "@/components/AddMembers/AddMembers";

export default function UsersDialog({ ref, users, handler }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <Dialog name={"Add members"} ref={ref}>
      <AddMembers
        users={users}
        selected={selectedUsers}
        clickHandler={(user) => {
          if (!selectedUsers.find((s) => s.id === user.id))
            setSelectedUsers([...selectedUsers, user]);
          else
            setSelectedUsers((prev) => [
              ...prev.filter((p) => p.id !== user.id),
            ]);
        }}
      />
      <button
        onClick={() => {
          handler(selectedUsers);
          setSelectedUsers([]);
          ref.current.close();
        }}
      >
        Add all
      </button>
    </Dialog>
  );
}
