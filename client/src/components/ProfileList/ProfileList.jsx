import styles from "./ProfileList.module.css";
import Image from "../Image/Image";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ProfileList({
  profiles,
  selectable = false,
  clickHandler,
  scrollHandler,
  display = "",
}) {
  const [selected, setSelected] = useState([]);

  return (
    <div style={{ display: display }}>
      <div
        className={styles.list}
        onScroll={async (event) => {
          const element = event.currentTarget;
          if (element.scrollTop + element.offsetHeight >= element.scrollHeight)
            await scrollHandler();
        }}
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={(event) => {
              if (!selectable) return clickHandler(profile);

              switch (event.currentTarget.style.opacity) {
                case "":
                case "1":
                  setSelected([...selected, profile.id]);
                  return clickHandler({ profile: profile, action: "add" });
                case "0.5":
                  setSelected((prev) => [
                    ...prev.filter((p) => p !== profile.id),
                  ]);
                  return clickHandler({ profile: profile, action: "remove" });
              }
            }}
            className={styles.item}
            style={{
              opacity: selectable
                ? !selected.includes(profile.id)
                  ? "1"
                  : "0.5"
                : "",
            }}
          >
            <Image src={profile.image} alt={`${profile.title} picture`} />
            <div className={styles.text}>
              <h3>{profile.title}</h3>
              {profile.content && <div>{profile.content}</div>}
            </div>
            {selectable && (
              <Check
                style={{ opacity: selected.includes(profile.id) ? "1" : "0" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
