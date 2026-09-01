import styles from "./Chats.module.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import { edit as groupEdit } from "@/fieldsets/groupFieldsets";
import { edit as userEdit } from "@/fieldsets/userFieldsets";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import Chat from "@/components/Chat/Chat";
import ProfileList from "@/components/ProfileList/ProfileList";
import Dialog from "@/components/Dialog/Dialog";
import Profile from "@/components/Profile/Profile";
import ProfileContext from "@/contexts/ProfileContext";

export default function Chats() {
  document.title = `${import.meta.env.VITE_TITLE}: Chats`;

  const locationState = useLocation().state;
  const [chats, dispatchChats] = useReducer(dispatcher, {});
  const [profile, setProfile] = useState({
    profile: {},
    chat: {},
    data: {},
    selected: false,
  });
  const profileDialog = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get("chat/user/logged");
      if (response.error)
        return dispatchChats({
          type: actions.load,
          payload: response,
        });

      response.data.sort(
        (a, b) =>
          new Date(b.messages[0].createdAt).getTime() -
          new Date(a.messages[0].createdAt).getTime(),
      );
      dispatchChats({
        type: actions.load,
        payload: response.data,
      });
      if (locationState) await profileListClickHandler(locationState);
    })();
  }, []);

  if (!Object.keys(chats).length || chats.error)
    return <Loader text={chats.error || "Getting chats..."} />;

  return (
    <div className={`page ${styles.chats}`}>
      <ProfileList
        profiles={chats.profiles.map((chat) => ({
          id: chat.profile.id,
          image: chat.profile.image,
          title: !chat.group ? chat.profile.username : chat.profile.name,
          content: chat.messages[0].content
            ? chat.messages[0].content
            : "attachment",
          chat: {
            type: !chat.group ? "user" : "group",
            id: chat.id,
          },
        }))}
        clickHandler={async (item) => {
          await profileListClickHandler(item);
        }}
        scrollHandler={async () => {
          if (!chats.page) return console.log("There are no more chats.");

          const response = await requestHandler.get(
            `chat/user/logged?q=${chats.page}`,
          );
          dispatchChats({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      />
      {!profile.selected ? (
        <p>Select a chat to view it here</p>
      ) : (
        <Chat
          initialChat={profile.chat}
          initialData={profile.data}
          profileDialogRef={profileDialog}
        />
      )}
      <ProfileContext
        value={{
          data: profile.profile.data,
          fieldset:
            profile.profile.type === "user" ? userEdit[0] : groupEdit[0],
        }}
      >
        {profile.profile.data && (
          <Dialog ref={profileDialog}>
            <Profile />
          </Dialog>
        )}
      </ProfileContext>
    </div>
  );

  async function profileListClickHandler(item) {
    let response = {};
    let profileData = {};

    if (item.chat.id) {
      response = await requestHandler.get(`message/chat/${item.chat.id}/`);
      if (item.chat.type === "user")
        profileData = await requestHandler.get(`user/${item.id}`);
      else profileData = await requestHandler.get(`group/${item.id}`);
    } else {
      switch (item.chat.type) {
        case "user":
          response = await requestHandler.get(`chat/otherUser/${item.id}`);
          break;
        case "group":
          response = await requestHandler.get(`chat/group/${item.id}`);
          break;
      }
    }

    let result;
    if (!response.error) {
      result = { selected: {}, page: 1, ...response.data };
      result.messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else result = response;

    setProfile({
      profile: { type: item.chat.type, data: profileData.data },
      chat: result,
      data: item,
      selected: true,
    });
  }
}
