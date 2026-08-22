import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { add } from "@/schemas/chatMemberFieldsets";
import { profile } from "@/schemas/groupFieldsets";
import { actions, dispatcher } from "@/reducers/chatMemberReducer";
import prepareChatMembers from "@/utils/js/prepareChatMembers";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import Dialog from "@/components/Dialog/Dialog";
import FormField from "@/components/FormField/FormField";
import Profile from "@/components/Profile/Profile";
import ChatMembers from "@/components/ChatMembers/ChatMembers";

export default function GroupProfile() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [group, setGroup] = useGet(`group/${id}`);
  const [chatMembers, dispatchChatMembers] = useReducer(dispatcher, {});
  const [users, setUsers] = useState([]);
  const usersDialog = useRef(null);
  const removeDialog = useRef(null);

  document.title = `${import.meta.env.VITE_TITLE}: ${group.name ? group.name : "Group"}`;

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(`chatMember/group/${id}`);

      dispatchChatMembers({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });
    })();
  }, []);

  if (!Object.keys(group).length || group.error)
    return <Loader text={group.error || "Getting group..."} />;
  if (!Object.keys(chatMembers).length || chatMembers.error)
    return <Loader text={chatMembers.error || "Getting chat members..."} />;

  const isLoggedUserMember = chatMembers.currentMember;
  const isCurrentMemberAdmin =
    isLoggedUserMember && chatMembers.currentMember.role === "ADMIN";

  const isMemberSelected = chatMembers.selected.id;
  const isSelectedMemberAdmin =
    isMemberSelected && chatMembers.selected.role === "ADMIN";

  return (
    <div className="page">
      <Profile
        form={{ fieldset: profile[0], data: group }}
        edit={{
          isAllowed: isCurrentMemberAdmin,
          handler: async (data) => {
            data = { ...group, ...data };
            await requestHandler.put(data, "group");
            setGroup(data);
          },
        }}
        options={[
          {
            text: "Add member",
            handler: async () => {
              const response = await requestHandler.get(
                `user/not/chat/${group.chats[0].id}`,
              );
              if (response.data) setUsers(response.data);
              else alert(response.error);

              usersDialog.current.showModal();
            },
            hide: !isCurrentMemberAdmin,
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
          },
          {
            text: "View chat",
            handler: async () =>
              navigate(`/chat`, {
                state: {
                  id: group.id,
                  image: group.image,
                  title: group.name,
                  chat: {
                    type: "group",
                    id: "",
                  },
                },
              }),
            hide: !isLoggedUserMember,
          },
        ]}
      />

      <ChatMembers
        members={chatMembers.members}
        memberMenu={{
          render: isLoggedUserMember,
          buttonHandler: (member) =>
            dispatchChatMembers({
              type: actions.select,
              payload: { selectedMember: member },
            }),
          options: [
            {
              text: "Change role",
              handler: changeMemberRoleHandler,
              hide: !isCurrentMemberAdmin,
            },
            {
              text: "Remove member",
              handler: () => removeDialog.current.showModal(),
              hide:
                !isCurrentMemberAdmin ||
                chatMembers.currentMember.id === chatMembers.selected.id,
            },
            {
              text: "See profile",
              handler: () =>
                location.assign(
                  `/profile/user/${chatMembers.selected.user.id}`,
                ),
            },
          ],
        }}
        addDialog={{
          render: isCurrentMemberAdmin,
          ref: usersDialog,
          users: users,
          handler: addMemberHandler,
        }}
      />

      {(!isSelectedMemberAdmin || isLoggedUserMember) && (
        <Dialog ref={removeDialog}>
          <p>
            {isLoggedUserMember &&
            chatMembers.selected.id === chatMembers.currentMember.id
              ? "Are you sure you want to exit this group?"
              : "Are you sure you want to remove this member?"}
          </p>
          <FormField
            properties={add[0].fields[0]}
            value={chatMembers.selected.id || ""}
          />
          <button
            onClick={() => {
              removeMemberHandler();
              removeDialog.current.close();
            }}
          >
            Yes
          </button>
        </Dialog>
      )}
    </div>
  );

  async function addMemberHandler(users) {
    const addMember = await requestHandler.post(
      {
        chatMembers: prepareChatMembers(users, group.chats[0].id),
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
      return location.reload();
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
