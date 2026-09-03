import styles from "./Chats.module.css";
import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import { edit as groupEdit } from "@/fieldsets/groupFieldsets";
import { edit as userEdit } from "@/fieldsets/userFieldsets";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import Chat from "@/components/Chat/Chat";
import ProfileList from "@/components/ProfileList/ProfileList";
import ProfileContext from "@/contexts/ProfileContext";

export default function Chats() {
  document.title = `${import.meta.env.VITE_TITLE}: Chats`;

  const locationState = useLocation().state;
  const [chats, dispatchChats] = useReducer(dispatcher, {});
  const [chat, setChat] = useState({});

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
        }))}
        clickHandler={(item) => setChat(item)}
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

      <ProfileContext
        value={{
          data: chat,
          fieldset: chat.type === "user" ? userEdit[0] : groupEdit[0],
        }}
      >
        {!Object.keys(chat).length ? (
          <p>Select a chat to view it here</p>
        ) : (
          <Chat />
        )}
      </ProfileContext>
    </div>
  );
}
