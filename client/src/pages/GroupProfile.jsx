import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import requestHandler from "@/handlers/requestHandler";
import { allFields } from "@/schemas/chatMemberSchema";
import { actions, dispatcher } from "@/reducers/chatMemberReducer";
import useGet from "@/hooks/useGet";
import Loader from "@/components/Loader";
import Member from "@/components/Member";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import ProfileList from "@/components/ProfileList";
import FormField from "@/components/FormField";
import Profile from "@/components/Profile";

export default function GroupProfile() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [group] = useGet(`group/${id}`);
  const [chatMembers, dispatchChatMembers] = useReducer(dispatcher, {});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersDialog = useRef(null);
  const removeDialog = useRef(null);
  const exitDialog = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(`chatMember/group/${id}`);
      if (response.error) return alert(response.error);

      dispatchChatMembers({
        type: actions.load,
        payload: {
          data: response.data,
        },
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
  const isCurrentMemberSelected =
    isMemberSelected &&
    chatMembers.selected.id === chatMembers.currentMember.id;
  const isSelectedMemberAdmin =
    isMemberSelected && chatMembers.selected.role === "ADMIN";

  return (
    <div className="page">
      <Profile
        initialData={{
          image: { id: "image", value: group.image },
          title: { id: "name", value: group.name },
          content: { id: "info", value: group.info },
        }}
        edit={{
          isAllowed: isCurrentMemberAdmin,
          handler: async (data) =>
            await requestHandler.put({ ...data, id: group.id }, "group"),
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
            handler: () => exitDialog.current.showModal(),
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
      <div>
        <h3>Members</h3>
        <div>
          {chatMembers.members.map((member) => (
            <Member
              key={member.id}
              data={{
                ...member,
                username: member.user.username,
                image: member.user.image,
              }}
              contextMenuHandler={(member) =>
                dispatchChatMembers({
                  type: actions.select,
                  payload: { selectedMember: member },
                })
              }
            >
              {chatMembers.selected.id === member.id &&
                !isCurrentMemberSelected && (
                  <Menu
                    options={[
                      { text: "Change role", handler: changeMemberRoleHandler },
                      {
                        text: "Remove member",
                        handler: () => removeDialog.current.showModal(),
                      },
                      {
                        text: "See profile",
                        handler: () =>
                          location.assign(
                            `/profile/user/${chatMembers.selected.user.id}`,
                          ),
                      },
                    ]}
                  />
                )}
            </Member>
          ))}
        </div>
        {isCurrentMemberAdmin && (
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
            <button onClick={() => addMemberHandler()}>Add all</button>
          </Dialog>
        )}
        {(!isSelectedMemberAdmin || isCurrentMemberAdmin) && (
          <Dialog ref={removeDialog}>
            <p>Are you sure you want to remove this member?</p>
            <FormField
              properties={allFields[0]}
              value={chatMembers.selected.id || ""}
            />
            <button onClick={() => removeMemberHandler()}>Yes</button>
          </Dialog>
        )}
        {isLoggedUserMember && (
          <Dialog ref={exitDialog}>
            <p>Are you sure you want to exit this group?</p>
            <FormField
              properties={allFields[0]}
              value={chatMembers.currentMember.id || ""}
            />
            <button
              onClick={() => {
                removeMemberHandler();
                exitDialog.current.close();
              }}
            >
              Yes
            </button>
          </Dialog>
        )}
      </div>
    </div>
  );

  async function addMemberHandler() {
    let newChatMembers = [];
    for (const user of selectedUsers) {
      newChatMembers.push({
        userId: user.id,
        chatId: group.chats[0].id,
      });
    }
    const addMember = await requestHandler.post(
      {
        chatMembers: JSON.stringify(newChatMembers),
      },
      "chatMember",
    );
    if (addMember.error) return alert(addMember.error);

    dispatchChatMembers({
      type: actions.add,
      payload: { data: addMember.data },
    });

    setSelectedUsers([]);
    usersDialog.current.close();
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
    const removeMember = await requestHandler.delete(
      chatMembers.selected.id,
      "chatMember",
    );
    if (removeMember) return alert(removeMember.error);

    dispatchChatMembers({
      type: actions.remove,
      payload: { id: chatMembers.selected.id },
    });

    removeDialog.current.close();
  }
}
