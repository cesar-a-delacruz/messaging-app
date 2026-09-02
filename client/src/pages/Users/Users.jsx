import styles from "./Users.module.css";
import { useEffect, useReducer, useState } from "react";
import { actions, dispatcher } from "@/reducers/profileListReducer";
import requestHandler from "@/handlers/requestHandler";
import Loader from "@/components/Loader/Loader";
import ProfileList from "@/components/ProfileList/ProfileList";
import User from "@/components/User/User";
import ProfileContext from "@/contexts/ProfileContext";
import { edit } from "@/fieldsets/userFieldsets";

export default function Users() {
  document.title = `${import.meta.env.VITE_TITLE}: Users`;

  const [users, dispatchUsers] = useReducer(dispatcher, {});
  const [profile, setProfile] = useState({ user: {} });

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
    <div className={`page ${styles.users}`}>
      <ProfileList
        profiles={users.profiles.map((user) => ({
          id: user.id,
          image: user.image,
          title: user.username,
          content: user.bio,
        }))}
        clickHandler={async (item) => {
          const response = await requestHandler.get(`user/${item.id}`);
          const result = !response.error ? response.data : response;

          setProfile({ user: result });
        }}
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

      <ProfileContext value={{ data: profile.user, fieldset: edit[0] }}>
        {!Object.keys(profile.user).length ? (
          <p>Select a user to view it here</p>
        ) : profile.user.error ? (
          <Loader text={profile.user.error} />
        ) : (
          <User />
        )}
      </ProfileContext>
    </div>
  );
}
