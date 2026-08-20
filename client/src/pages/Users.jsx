import { useEffect, useReducer } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";

export default function Users() {
  const [users, dispatchUsers] = useReducer(dispatcher, {});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get("user/not/logged");

      dispatchUsers({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });
    })();
  }, []);

  if (!Object.keys(users).length || users.error)
    return <Loader text={users.error || "Getting users..."} />;

  return (
    <div className="page">
      <ProfileList
        items={users.profiles.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
          chat: {
            type: "user",
            id: "",
          },
        }))}
        clickHandler={(item) => location.assign(`/profile/user/${item.id}`)}
      />
      <button
        onClick={async () => {
          const response = await requestHandler.get(
            `user/not/logged?q=${users.page}`,
          );
          dispatchUsers({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      >
        Load more
      </button>
    </div>
  );
}
