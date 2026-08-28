import styles from "./Groups.module.css";
import { useEffect, useReducer, useState } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";
import GroupProfile from "../../components/GroupProfile/GroupProfile";

export default function Groups() {
  document.title = `${import.meta.env.VITE_TITLE}: Groups`;

  const [groups, dispatchGroups] = useReducer(dispatcher, {});
  const [profile, setProfile] = useState({
    group: {},
    chatMembers: {},
    selected: false,
  });

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get("group");

      dispatchGroups({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });
    })();
  }, []);

  if (!Object.keys(groups).length || groups.error)
    return <Loader text={groups.error || "Getting groups..."} />;

  return (
    <div className={`page ${styles.groups}`}>
      <ProfileList
        profiles={groups.profiles.map((group) => ({
          id: group.id,
          image: group.image,
          title: group.name,
          content: group.info,
          chat: {
            type: "group",
            id: "",
          },
        }))}
        clickHandler={async (item) => {
          const groupResponse = await requestHandler.get(`group/${item.id}`);
          const chatMembersResponse = await requestHandler.get(
            `chatMember/group/${item.id}`,
          );
          const groupResult = !groupResponse.error
            ? groupResponse.data
            : groupResponse;
          const chatMembersResult = !chatMembersResponse.error
            ? { selected: {}, ...chatMembersResponse.data }
            : chatMembersResponse;

          setProfile({
            group: groupResult,
            chatMembers: chatMembersResult,
            selected: true,
          });
        }}
        scrollHandler={async () => {
          if (!groups.page) return console.log("There are no more groups.");

          const response = await requestHandler.get(`group?q=${groups.page}`);
          dispatchGroups({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      />
      {!profile.selected ? (
        <p>Select a group to view it here</p>
      ) : profile.group.error ? (
        <Loader text={profile.group.error} />
      ) : profile.chatMembers.error ? (
        <Loader text={profile.chatMembers.error} />
      ) : (
        <GroupProfile
          initialGroup={profile.group}
          initialChatMembers={profile.chatMembers}
        />
      )}
    </div>
  );
}
