import styles from "./Menu.module.css";
import { useContext, useRef } from "react";
import MenuContext from "@/contexts/MenuContext";
import { CurrentMenuContext } from "@/contexts/CurrentMenuContext";
import { Ellipsis } from "lucide-react";

export default function Menu({ selectionHandler }) {
  const { options, render } = useContext(MenuContext);
  const { current, setCurrent } = useContext(CurrentMenuContext);
  const menuRef = useRef(null);

  if (!render) return <></>;

  return (
    <div className={styles.container}>
      <div ref={menuRef} className={styles.menu} style={{ display: "none" }}>
        {options.map(
          (option) =>
            !option.hide && (
              <div
                key={option.text}
                className={styles.option}
                onClick={() => {
                  option.handler();
                  menuRef.current.style.display = "none";
                }}
              >
                {option.icon && option.icon}
                <span>{option.text}</span>
              </div>
            ),
        )}
      </div>
      <div
        className={styles.button}
        onClick={(event) => {
          if (selectionHandler) selectionHandler();

          if (current && current !== menuRef.current)
            current.style.display = "none";
          menuRef.current.style.display =
            menuRef.current.style.display === "block" ? "none" : "block";
          setCurrent(menuRef.current);

          event.stopPropagation();
        }}
      >
        <Ellipsis />
      </div>
    </div>
  );
}
