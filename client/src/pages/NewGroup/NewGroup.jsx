import styles from "./NewGroup.module.css";
import { useContext, useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { create } from "@/fieldsets/groupFieldsets";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import ChatMembers from "@/components/ChatMembers/ChatMembers";
import MenuContext from "@/contexts/MenuContext";
import { ArrowLeft, UserLock, UserMinus, UserPlus } from "lucide-react";
import { DisplayContext } from "@/contexts/DisplayContext";
import Profile from "@/components/Profile/Profile";
import ProfileContext from "@/contexts/ProfileContext";

export default function NewGroup() {
  document.title = `${import.meta.env.VITE_TITLE}: New Group`;

  const [chatMembers, setChatMembers] = useState({
    members: [],
    selected: {},
  });
  const [users, setUsers] = useState([]);
  const usersDialog = useRef(null);
  const { dispatchDisplay } = useContext(DisplayContext);
  dispatchDisplay("none");

  return (
    <div className={`page ${styles.newGroup}`}>
      <h2>New Group</h2>

      <ProfileContext
        value={{
          data: {
            image: "",
            name: "",
            info: "",
          },
          fieldset: create[0],
        }}
      >
        <Profile
          readOnly={false}
          editHandler={submitHandler}
          submitText="Create"
          options={[
            {
              text: "Return",
              handler: async () => history.back(),
              icon: <ArrowLeft />,
              hide: !screen.orientation.type.includes("portrait"),
            },
            {
              text: "Add member",
              handler: async () => {
                const response = await requestHandler.get("user/not/logged");
                if (response.data) setUsers(response.data);
                else alert(response.error);

                usersDialog.current.showModal();
              },
              icon: <UserPlus />,
            },
          ]}
        />
      </ProfileContext>

      <MenuContext
        value={{
          options: [
            {
              text: "Change role",
              handler: changeMemberRoleHandler,
              icon: <UserLock />,
            },
            {
              text: "Remove member",
              handler: removeMemberHandler,
              icon: <UserMinus />,
            },
          ],
          render: true,
        }}
      >
        <ChatMembers
          members={chatMembers.members}
          selectionHandler={(member) =>
            setChatMembers({ ...chatMembers, selected: member })
          }
          addDialog={{
            render: true,
            ref: usersDialog,
            users: users,
            handler: addMemberHandler,
          }}
        />
      </MenuContext>
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
