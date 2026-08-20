import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileList.module.css";
import Image from "../Image/Image";

export default function ProfileList({ items, clickHandler }) {
  const navigate = useNavigate();
  const [list, setList] = useState(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  return (
    <div className={styles.list}>
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
