import styles from "./ProfileList.module.css";
import { useState, useEffect } from "react";
import Image from "../Image/Image";

export default function ProfileList({ items, clickHandler, scrollHandler }) {
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  return (
    <div
      className={styles.list}
      onScroll={async (event) => {
        const element = event.currentTarget;
        if (element.scrollTop + element.offsetHeight >= element.scrollHeight)
          await scrollHandler();
      }}
    >
      {list.map((item) => (
        <div
          key={item.id}
          onClick={() => clickHandler(item)}
          className={styles.item}
        >
          <Image src={item.image} alt={`${item.title} picture`} />
          <div className={styles.text}>
            <h3>{item.title}</h3>
            {item.content && <div>{item.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
