import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile/Profile";

export default function User({ initialUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser.id]);

  return (
    <div className={styles.userProfile}>
      <Profile
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
