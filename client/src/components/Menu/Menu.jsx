import styles from "./Menu.module.css";
import { useState } from "react";

export default function Menu({ options = [], buttonHandler }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.menu}
        style={{ display: showMenu ? "block" : "none" }}
      >
        {options.map(
          (option) =>
            !option.hide && (
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
            ),
        )}
      </div>
      <div
        className={styles.button}
        onClick={(event) => {
          if (buttonHandler) buttonHandler();
          setShowMenu(!showMenu);
          event.stopPropagation();
        }}
      >
        . . .
      </div>
    </div>
  );
}
