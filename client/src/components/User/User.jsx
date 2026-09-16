import styles from "./User.module.css";
import { useContext } from "react";
import Profile from "@/components/Profile/Profile";
import ProfileContext from "@/contexts/ProfileContext";
import { MessageSquareShare } from "lucide-react";

export default function User() {
  const user = useContext(ProfileContext).data;

  return (
    <div className={styles.userProfile}>
      <Profile
        options={[
          {
            text: "View chat",
            handler: async () => {
              location.assign("/");
              localStorage.setItem(
                "chat",
                JSON.stringify({
                  id: user.id,
                  image: user.image,
                  title: user.username,
                  type: "user",
                }),
              );
            },
            icon: <MessageSquareShare />,
          },
        ]}
      />
    </div>
  );
}
