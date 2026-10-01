import styles from "@/utils/css/modules/list.module.css";
import Image from "@/components/Image/Image";

export default function ProfileList({
  profiles,
  clickHandler,
  scrollHandler,
  display = "",
}) {
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
            onClick={() => clickHandler(profile)}
            className={styles.item}
          >
            <Image
              src={profile.image || "/empty.webp"}
              alt={`${profile.title} picture`}
            />
            <div className={styles.text}>
              <h3>{profile.title}</h3>
              {profile.content && <div>{profile.content}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
