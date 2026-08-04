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
          response,
        },
      });
    })();
  }, []);

  if (!group.data)
    return <Loader text={!group.error ? "Getting group..." : group.error} />;
  if (!chatMembers.data)
    return (
      <Loader
        text={
          !chatMembers.error ? "Getting chat members..." : chatMembers.error
        }
      />
    );

  return (
    <div className="page">
      <Profile
        initialData={{
          image: { id: "image", value: group.data.image },
          title: { id: "name", value: group.data.name },
          content: { id: "info", value: group.data.info },
        }}
        contentEditable={
          chatMembers.data.currentMember &&
          chatMembers.data.currentMember.role === "ADMIN"
        }
        editHandler={async (data) =>
          await requestHandler.put({ ...data, id: group.data.id }, "group")
        }
      />
      <div>
        <h3>Members</h3>
        {chatMembers.data.currentMember &&
          chatMembers.data.currentMember.role === "ADMIN" && (
            <button
              onClick={async () => {
                const response = await requestHandler.get(
                  `user/not/chat/${group.data.chats[0].id}`,
                );
                if (response.data) setUsers(response.data);
                else alert(response.error);

                usersDialog.current.showModal();
              }}
            >
              Add members
            </button>
          )}
        {chatMembers.data.currentMember && (
          <>
            <button onClick={async () => exitDialog.current.showModal()}>
              Exit group
            </button>
            <button
              onClick={async () =>
                navigate(`/chat`, {
                  state: {
                    id: group.data.id,
                    image: group.data.image,
                    title: group.data.name,
                    chat: {
                      type: "group",
                      id: "",
                    },
                  },
                })
              }
            >
              View chat
            </button>
          </>
        )}
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
        <div>
          {chatMembers.data.members.map((member) => (
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
              {chatMembers.data.selected.id === member.id && (
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
                          `/profile/user/${chatMembers.data.selected.user.id}`,
                        ),
                    },
                  ]}
                />
              )}
            </Member>
          ))}
        </div>
        <Dialog ref={removeDialog}>
          <p>Are you sure you want to remove this member?</p>
          <FormField
            properties={allFields[0]}
            value={chatMembers.data.selected.id || ""}
          />
          <button onClick={() => removeMemberHandler()}>Yes</button>
        </Dialog>
        {chatMembers.data.currentMember && (
          <Dialog ref={exitDialog}>
            <p>Are you sure you want to exit this group?</p>
            <FormField
              properties={allFields[0]}
              value={chatMembers.data.currentMember.id || ""}
            />
            <button
              onClick={() => {
                removeMemberHandler(chatMembers.data.currentMember.id);
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
    if (chatMembers.data.currentMember.role !== "ADMIN") return;

    let newChatMembers = [];
    for (const user of selectedUsers) {
      newChatMembers.push({
        userId: user.id,
        chatId: group.data.chats[0].id,
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
    if (chatMembers.data.selected.id === chatMembers.data.currentMember.id)
      return;

    const member = {
      ...chatMembers.data.selected,
      role: chatMembers.data.selected.role === "ADMIN" ? "NONE" : "ADMIN",
    };
    const changeRole = await requestHandler.put(member, "chatMember");
    if (changeRole) return alert(changeRole.error);

    dispatchChatMembers({
      type: actions.changeRole,
      payload: { memberRole: member.role },
    });
  }
  async function removeMemberHandler(id) {
    if (
      chatMembers.data.selected.id === chatMembers.data.currentMember.id ||
      chatMembers.data.selected.role === "ADMIN" ||
      chatMembers.data.currentMember.role !== "ADMIN"
    )
      return;

    const removeMember = await requestHandler.delete(id, "chatMember");
    if (removeMember) return alert(removeMember.error);

    dispatchChatMembers({
      type: actions.remove,
      payload: { id },
    });

    removeDialog.current.close();
  }
}
