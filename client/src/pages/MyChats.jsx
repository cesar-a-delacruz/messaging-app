import { useEffect, useReducer } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";
import { useNavigate } from "react-router-dom";

export default function MyChats() {
  const navigate = useNavigate();
  const [chats, dispatchChats] = useReducer(dispatcher, {});

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
    })();
  }, []);

  if (!Object.keys(chats).length || chats.error)
    return <Loader text={chats.error || "Getting chats..."} />;

  return (
    <div className="page">
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
        clickHandler={(chat) => navigate("/chat", { state: chat })}
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
    </div>
  );
}
