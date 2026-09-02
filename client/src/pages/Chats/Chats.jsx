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
      if (locationState) await loadChat(locationState);
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
          type: !chat.group ? "user" : "group",
          item: chat.profile,
        }))}
        clickHandler={async (item) => await loadChat(item)}
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
      {!Object.keys(profile.chat).length ? (
        <p>Select a chat to view it here</p>
      ) : (
        <Chat
          initialChat={profile.chat}
          initialData={{ ...profile.data, type: profile.type }}
          profileDialogRef={profileDialog}
        />
      )}
      <ProfileContext
        value={{
          data: profile.data.item || {},
          fieldset: profile.type === "user" ? userEdit[0] : groupEdit[0],
        }}
      >
        <Dialog ref={profileDialog}>
          <Profile />
        </Dialog>
      </ProfileContext>
    </div>
  );

  async function loadChat(item) {
    let response = {};

    switch (item.type) {
      case "user":
        response = await requestHandler.get(`chat/otherUser/${item.id}`);
        break;
      case "group":
        response = await requestHandler.get(`chat/group/${item.id}`);
        break;
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
      chat: result,
      data: item,
      type: item.type,
    });
  }
}
