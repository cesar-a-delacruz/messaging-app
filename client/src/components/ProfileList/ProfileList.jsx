import styles from "./ProfileList.module.css";
import Image from "../Image/Image";

export default function ProfileList({ profiles, clickHandler, scrollHandler }) {
  return (
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
          <Image src={profile.image} alt={`${profile.title} picture`} />
          <div className={styles.text}>
            <h3>{profile.title}</h3>
            {profile.content && <div>{profile.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
