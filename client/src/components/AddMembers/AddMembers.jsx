import styles from "@/utils/css/modules/list.module.css";
import Image from "@/components/Image/Image";
import { Check } from "lucide-react";

export default function AddMembers({
  users,
  selected,
  clickHandler,
  scrollHandler,
}) {
  return (
    <div>
      <div
        className={styles.list}
        onScroll={async (event) => {
          const element = event.currentTarget;
          if (element.scrollTop + element.offsetHeight >= element.scrollHeight)
            await scrollHandler();
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => clickHandler(user)}
            className={styles.item}
            style={{
              display: user.hide ? "none" : "",
              opacity: !selected.find((s) => s.id === user.id) ? "1" : "0.5",
            }}
          >
            <Image
              src={user.image || "/empty.webp"}
              alt={`${user.username} picture`}
            />
            <div className={styles.text}>
              <h3>{user.username}</h3>
            </div>
            <Check
              style={{
                opacity: selected.find((s) => s.id === user.id) ? "1" : "0",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
