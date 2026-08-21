import styles from "./Menu.module.css";
import { useState } from "react";

export default function Menu({ options = [] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={styles.menu}
        style={{ display: showMenu ? "initial" : "none" }}
      >
        {options.map((option) => (
          <div
            key={option.text}
            className={styles.option}
            onClick={() => {
              option.handler();
              setShowMenu(false);
            }}
          >
            {option.text}
          </div>
        ))}
      </div>
      <div
        className={styles.button}
        onClick={(event) => {
          setShowMenu(!showMenu);
          event.stopPropagation();
        }}
      >
        . . .
      </div>
    </>
  );
}
