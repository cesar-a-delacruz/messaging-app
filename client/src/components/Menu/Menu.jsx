import styles from "./Menu.module.css";

export default function Menu({ options = [], visible = true }) {
  return (
    <div
      className={styles.menu}
      style={{ display: visible ? "block" : "none" }}
    >
      {options.map((option) => (
        <div
          key={option.text}
          className={styles.option}
          onClick={() => option.handler()}
        >
          {option.text}
        </div>
      ))}
    </div>
  );
}
