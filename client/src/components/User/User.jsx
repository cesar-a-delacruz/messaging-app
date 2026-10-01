import styles from "./User.module.css";
import { useContext } from "react";
import Profile from "@/components/Profile/Profile";
import ProfileContext from "@/contexts/ProfileContext";
import { ArrowLeft, MessageSquareShare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const { data, setData } = useContext(ProfileContext);

  return (
    <div className={styles.user}>
      <Profile
        options={[
          {
            text: "Return",
            handler: async () => {
              setData({});
            },
            icon: <ArrowLeft />,
            hide: !screen.orientation.type.includes("portrait"),
          },
          {
            text: "View chat",
            handler: async () =>
              navigate("/", {
                state: {
                  id: data.id,
                  image: data.image,
                  title: data.username,
                  type: "user",
                },
              }),
            icon: <MessageSquareShare />,
          },
        ]}
      />
    </div>
  );
}
