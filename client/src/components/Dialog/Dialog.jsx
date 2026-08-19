import styles from "./Dialog.module.css";

export default function Dialog({ name, ref, children }) {
  return (
    <dialog ref={ref}>
      <div className={styles.top}>
        <h2>{name ? name : ""}</h2>
        <button
          onClick={(e) => e.currentTarget.parentElement.parentElement.close()}
        >
          X
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}
