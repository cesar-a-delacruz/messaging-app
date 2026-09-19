import listPageStyles from "@/utils/css/modules/listPage.module.css";
import { useEffect, useReducer, useState } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";
import User from "@/components/User/User";
import ProfileContext from "@/contexts/ProfileContext";
import { edit } from "@/fieldsets/userFieldsets";
import { UserIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Users() {
  document.title = `${import.meta.env.VITE_TITLE}: Users`;

  const locationState = useLocation().state;
  const [users, dispatchUsers] = useReducer(dispatcher, {});
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get("user/not/logged");

      dispatchUsers({
        type: actions.load,
        payload: !response.error ? response.data : response,
      });

      if (locationState) {
        findUser(locationState);
        window.history.replaceState({}, "");
      }
    })();
  }, []);

  if (!Object.keys(users).length || users.error)
    return <Loader text={users.error || "Getting users..."} />;

  return (
    <div className={`page ${listPageStyles.list}`}>
      <ProfileList
        profiles={users.profiles.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
        }))}
        clickHandler={async (item) => findUser(item.id)}
        scrollHandler={async () => {
          if (!users.page) return console.log("There are no more users.");

          const response = await requestHandler.get(
            `user/not/logged?q=${users.page}`,
          );
          dispatchUsers({
            type: actions.fetch,
            payload: !response.error ? response.data : response,
          });
        }}
      />

      <ProfileContext value={{ data: user, fieldset: edit[0] }}>
        <div className={listPageStyles.view}>
          {!Object.keys(user).length ? (
            <>
              <UserIcon />
              <p>Select a user to view it here</p>
            </>
          ) : user.error ? (
            <Loader text={user.error} />
          ) : (
            <User />
          )}
        </div>
      </ProfileContext>
    </div>
  );

  async function findUser(id) {
    const response = await requestHandler.get(`user/${id}`);
    const result = !response.error ? response.data : response;
    setUser(result);
  }
}
