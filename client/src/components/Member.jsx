import styles from "./styles/List.module.css";

export default function Member({ data, children, contextMenuHandler }) {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        contextMenuHandler(data);
      }}
    >
      <img src={data.user.image} alt={`${data.user.username} picture`} />
      <div className={styles.text}>
        <h3>
          {data.user.username}{" "}
          <span>{data.role === "NONE" ? "" : "ADMIN"}</span>
        </h3>
      </div>
      {children}
    </div>
  );
}
