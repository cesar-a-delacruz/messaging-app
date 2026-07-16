import styles from "./styles/Menu.module.css";

export default function Menu({ options = [], message }) {
  return (
    <div className={styles.menu}>
      {options.map((option) => (
        <div
          key={option.text}
          className={styles.option}
          onClick={() => option.handler(message)}
        >
          {option.text}
        </div>
      ))}
    </div>
  );
}
