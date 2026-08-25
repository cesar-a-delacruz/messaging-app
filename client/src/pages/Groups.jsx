import { useEffect, useReducer } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";

export default function Groups() {
  const [groups, dispatchGroups] = useReducer(dispatcher, {});

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
    <div className="page">
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
        clickHandler={(item) => location.assign(`/profile/group/${item.id}`)}
        scrollHandler={async () => {
          if (!groups.page) return console.log("There are no more groups.");

          const response = await requestHandler.get(`group?q=${groups.page}`);
          dispatchGroups({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      />
    </div>
  );
}
