import styles from "./styles/Dialog.module.css";

export default function Dialog({ ref, children }) {
  return (
    <dialog ref={ref}>
      <div className="top">
        <button
          onClick={(e) => e.currentTarget.parentElement.parentElement.close()}
        >
          X
        </button>
      </div>
      <div className="content">{children}</div>
    </dialog>
  );
}
