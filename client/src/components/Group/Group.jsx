import styles from "./Group.module.css";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestHandler from "@/handlers/requestHandler";
import { remove } from "@/fieldsets/chatMemberFieldsets";
import { actions, dispatcher } from "@/reducers/chatMemberReducer";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import Dialog from "@/components/Dialog/Dialog";
import Profile from "@/components/Profile/Profile";
import ChatMembers from "@/components/ChatMembers/ChatMembers";
import Form from "@/components/Form/Form";
import ProfileContext from "@/contexts/ProfileContext";
import MenuContext from "@/contexts/MenuContext";
import {
  DoorOpen,
  ExternalLink,
  MessageSquareShare,
  UserLock,
  UserMinus,
  UserPlus,
} from "lucide-react";

export default function Group() {
  const navigate = useNavigate();
  const { data, setData } = useContext(ProfileContext);
  const [chatMembers, dispatchChatMembers] = useReducer(dispatcher, {});
  const [users, setUsers] = useState([]);
  const usersDialog = useRef(null);
  const removeDialog = useRef(null);

  useEffect(() => {
    (async () => {
      const chatMembers = await requestHandler.get(
        `chatMember/group/${data.id}`,
      );
      dispatchChatMembers({
        type: actions.load,
        payload: !chatMembers.error
          ? { selected: {}, ...chatMembers.data }
          : chatMembers,
      });
    })();
  }, [data.id]);

  if (!Object.keys(chatMembers).length) return <></>;

  const isLoggedUserMember = chatMembers.currentMember;
  const isCurrentMemberAdmin =
    isLoggedUserMember && chatMembers.currentMember.role === "ADMIN";

  const isMemberSelected = chatMembers.selected.id;
  const isSelectedMemberAdmin =
    isMemberSelected && chatMembers.selected.role === "ADMIN";

  return (
    <div className={styles.groupProfile}>
      <Profile
        readOnly={!isCurrentMemberAdmin}
        editHandler={async (newData) => {
          newData = { ...data, ...newData };
          await requestHandler.put(newData, "group");
          setData(newData);
        }}
        options={[
          {
            text: "Add member",
            handler: async () => {
              const response = await requestHandler.get(
                `user/not/chat/${data.chats[0].id}`,
              );
              if (response.data) setUsers(response.data);
              else alert(response.error);

              usersDialog.current.showModal();
            },
            hide: !isCurrentMemberAdmin,
            icon: <UserPlus />,
          },
          {
            text: "Exit group",
            handler: () => {
              dispatchChatMembers({
                type: actions.select,
                payload: { selectedMember: chatMembers.currentMember },
              });
              removeDialog.current.showModal();
            },
            hide: !isLoggedUserMember,
            icon: <DoorOpen />,
          },
          {
            text: "View chat",
            handler: async () => {
              location.assign("/");
              localStorage.setItem(
                "chat",
                JSON.stringify({
                  id: data.id,
                  image: data.image,
                  title: data.name,
                  type: "group",
                }),
              );
            },
            hide: !isLoggedUserMember,
            icon: <MessageSquareShare />,
          },
        ]}
      />
      <MenuContext
        value={{
          options: [
            {
              text: "Change role",
              handler: changeMemberRoleHandler,
              hide: !isCurrentMemberAdmin,
              icon: <UserLock />,
            },
            {
              text: "Remove member",
              handler: () => removeDialog.current.showModal(),
              hide:
                !isCurrentMemberAdmin ||
                chatMembers.currentMember.id === chatMembers.selected.id,
              icon: <UserMinus />,
            },
            {
              text: "See profile",
              handler: () =>
                navigate("/users", { state: chatMembers.selected.user.id }),
              icon: <ExternalLink />,
            },
          ],
          render: isLoggedUserMember,
        }}
      >
        <ChatMembers
          members={chatMembers.members}
          selectionHandler={(member) =>
            dispatchChatMembers({
              type: actions.select,
              payload: { selectedMember: member },
            })
          }
          addDialog={{
            render: isCurrentMemberAdmin,
            ref: usersDialog,
            users: users,
            handler: addMemberHandler,
          }}
        />
      </MenuContext>

      {(!isSelectedMemberAdmin || isLoggedUserMember) && (
        <Dialog ref={removeDialog}>
          <p>
            {isLoggedUserMember &&
            chatMembers.selected.id === chatMembers.currentMember.id
              ? "Are you sure you want to exit this group?"
              : "Are you sure you want to remove this member?"}
          </p>
          <Form
            fieldsets={remove}
            initialData={{ id: chatMembers.selected.id || "" }}
            submit={{
              text: "Yes",
              handler: () => {
                removeMemberHandler();
                removeDialog.current.close();
              },
              disable: false,
            }}
          />
        </Dialog>
      )}
    </div>
  );

  async function addMemberHandler(users) {
    const addMember = await requestHandler.post(
      {
        chatMembers: prepareChatMembers(users, data.chats[0].id),
      },
      "chatMember",
    );
    if (addMember.error) return alert(addMember.error);

    dispatchChatMembers({
      type: actions.add,
      payload: { data: addMember.data },
    });
  }
  async function changeMemberRoleHandler() {
    const member = {
      ...chatMembers.selected,
      role: isSelectedMemberAdmin ? "NONE" : "ADMIN",
    };
    const changeRole = await requestHandler.put(member, "chatMember");
    if (changeRole) return alert(changeRole.error);

    dispatchChatMembers({
      type: actions.changeRole,
      payload: { memberRole: member.role },
    });
  }
  async function removeMemberHandler() {
    if (chatMembers.members.length === 2) {
      const lastMember = chatMembers.members.find(
        (member) => member.id !== chatMembers.selected.id,
      );
      const lastMemberRoleChange = await requestHandler.put(
        { ...lastMember, role: "ADMIN" },
        "chatMember",
      );
      if (lastMemberRoleChange) return alert(lastMemberRoleChange.error);
      location.reload();
    }

    const removeMember = await requestHandler.delete(
      chatMembers.selected.id,
      "chatMember",
    );
    if (removeMember) return alert(removeMember.error);

    dispatchChatMembers({
      type: actions.remove,
      payload: { id: chatMembers.selected.id },
    });
  }
}
