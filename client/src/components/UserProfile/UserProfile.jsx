import styles from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { edit } from "@/fieldsets/userFieldsets";
import Profile from "@/components/Profile/Profile";

export default function UserProfile({ initialUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser.id]);

  return (
    <div className={styles.userProfile}>
      <Profile
        form={{
          fieldset: edit[0],
          data: {
            image: user.image,
            fullname: user.fullname,
            bio: user.bio,
          },
        }}
        edit={{
          isAllowed: false,
          handler: () => {},
        }}
        options={[
          {
            text: "View chat",
            handler: async () =>
              navigate(`/`, {
                state: {
                  id: user.id,
                  image: user.image,
                  title: user.fullname,
                  chat: {
                    type: "user",
                    id: "",
                  },
                },
              }),
          },
        ]}
      />
    </div>
  );
}
