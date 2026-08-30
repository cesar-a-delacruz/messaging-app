import styles from "./Chats.module.css";
import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import Chat from "@/components/Chat/Chat";
import ProfileList from "@/components/ProfileList/ProfileList";

export default function Chats() {
  document.title = `${import.meta.env.VITE_TITLE}: Chats`;

  const locationState = useLocation().state;
  const [chats, dispatchChats] = useReducer(dispatcher, {});
  const [profile, setProfile] = useState({
    chat: {},
    data: {},
    selected: false,
  });

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
        clickHandler={async (item) => await profileListClickHandler(item)}
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
        <Chat initialChat={profile.chat} initialData={profile.data} />
      )}
    </div>
  );

  async function profileListClickHandler(item) {
    let response = {};

    if (item.chat.id)
      response = await requestHandler.get(`message/chat/${item.chat.id}/`);
    else {
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
      chat: result,
      data: item,
      selected: true,
    });
  }
}
