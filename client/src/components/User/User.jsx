import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Profile from "@/components/Profile/Profile";
import ProfileContext from "@/contexts/ProfileContext";

export default function User() {
  const navigate = useNavigate();
  const user = useContext(ProfileContext).data;

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
