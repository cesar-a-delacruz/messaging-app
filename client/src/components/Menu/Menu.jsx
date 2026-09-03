import MenuContext from "@/contexts/MenuContext";
import styles from "./Menu.module.css";
import { useContext, useState } from "react";

export default function Menu({ selectionHandler }) {
  const { options, render } = useContext(MenuContext);
  const [showMenu, setShowMenu] = useState(false);

  if (!render) return <></>;

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
          if (selectionHandler) selectionHandler();
          setShowMenu(!showMenu);
          event.stopPropagation();
        }}
      >
        . . .
      </div>
    </div>
  );
}
