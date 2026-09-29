import styles from "./NewGroup.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestHandler from "@/handlers/requestHandler";
import { create } from "@/fieldsets/groupFieldsets";
import removeEmptyFields from "@/utils/js/removeEmptyFields";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import MenuContext from "@/contexts/MenuContext";
import ProfileContext from "@/contexts/ProfileContext";
import { DisplayContext } from "@/contexts/DisplayContext";
import { ArrowLeft, UserLock, UserMinus, UserPlus } from "lucide-react";
import ChatMembers from "@/components/ChatMembers/ChatMembers";
import Profile from "@/components/Profile/Profile";
import UsersDialog from "@/components/UsersDialog/UsersDialog";

export default function NewGroup() {
  document.title = `${import.meta.env.VITE_TITLE}: New Group`;

  const navigate = useNavigate();
  const [chatMembers, setChatMembers] = useState({
    members: [],
    selected: {},
  });
  const [users, setUsers] = useState([]);
  const usersDialog = useRef();
  const { dispatchDisplay } = useContext(DisplayContext);

  useEffect(() => {
    (async () => {
      dispatchDisplay("none");
      const response = await requestHandler.get("user/not/logged");
      if (response.data) setUsers(response.data);
      else alert(response.error);
    })();
  }, []);

  return (
    <div className={`page ${styles.newGroup}`}>
      <h2>New Group</h2>

      <ProfileContext
        value={{
          data: {},
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
              handler: async () => usersDialog.current.showModal(),
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
        />
      </MenuContext>
      <UsersDialog ref={usersDialog} users={users} handler={addMemberHandler} />
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

    if (newGroup.data) return navigate("/groups", { state: newGroup.data.id });

    return newGroup;
  }

  async function addMemberHandler(newMembers) {
    setChatMembers((prev) => {
      const current = prev;
      newMembers = newMembers.map((member) => ({
        user: member,
      }));
      current.members = [...prev.members, ...newMembers];

      return { ...current };
    });

    setUsers((prev) => {
      const newUsers = prev.map((user) => {
        for (const member of newMembers) {
          if (user.id === member.user.user.id) user.hide = true;
        }
        return user;
      });
      return [...newUsers];
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
    const selectedMember = chatMembers.selected;

    setChatMembers((prev) => {
      const current = prev;
      current.members = prev.members.filter(
        (member) => member.user.id !== selectedMember.user.id,
      );
      current.selected = {};
      return { ...current };
    });
    setUsers((prev) => {
      const newUsers = prev.map((user) => {
        if (user.id === selectedMember.user.id) user.hide = false;
        return user;
      });
      return [...newUsers];
    });
  }
}
