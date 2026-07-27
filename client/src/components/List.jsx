import { useState, useEffect, Children } from "react";
import styles from "./styles/List.module.css";

export default function List({ items, clickHandler, children }) {
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
          <img src={item.image} alt={`${item.title} picture`} />
          <div className={styles.text}>
            <h3>
              {item.title} <span>{item.highlight && item.highlight}</span>
            </h3>
            {item.content && <div>{item.content}</div>}
          </div>
          {children}
        </div>
      ))}
    </div>
  );
}
