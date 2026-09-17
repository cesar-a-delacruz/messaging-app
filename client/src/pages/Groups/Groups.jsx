import listPageStyles from "@/utils/css/modules/listPage.module.css";
import styles from "./Groups.module.css";
import { useEffect, useReducer, useState } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";
import Group from "@/components/Group/Group";
import ProfileContext from "@/contexts/ProfileContext";
import { edit } from "@/fieldsets/groupFieldsets";
import { UserGroup } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Groups() {
  document.title = `${import.meta.env.VITE_TITLE}: Groups`;

  const locationState = useLocation().state;
  const [groups, dispatchGroups] = useReducer(dispatcher, {});
  const [group, setGroup] = useState({});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get("group");

      dispatchGroups({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });

      if (locationState) {
        findGroup(locationState);
        window.history.replaceState({}, "");
      }
    })();
  }, []);

  if (!Object.keys(groups).length || groups.error)
    return <Loader text={groups.error || "Getting groups..."} />;

  return (
    <div className={`page ${listPageStyles.list} ${styles.groups}`}>
      <ProfileList
        profiles={groups.profiles.map((group) => ({
          id: group.id,
          image: group.image,
          title: group.name,
          content: group.info,
        }))}
        clickHandler={async (item) => findGroup(item.id)}
        scrollHandler={async () => {
          if (!groups.page) return console.log("There are no more groups.");

          const response = await requestHandler.get(`group?q=${groups.page}`);
          dispatchGroups({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      />

      <ProfileContext
        value={{ data: group, fieldset: edit[0], setData: setGroup }}
      >
        {!Object.keys(group).length ? (
          <div className={listPageStyles.empty}>
            <UserGroup />
            <p>Select a group to view it here</p>
          </div>
        ) : group.error ? (
          <Loader text={group.error} />
        ) : (
          <Group />
        )}
      </ProfileContext>
    </div>
  );

  async function findGroup(id) {
    const response = await requestHandler.get(`group/${id}`);
    const result = !response.error ? response.data : response;
    setGroup(result);
  }
}
