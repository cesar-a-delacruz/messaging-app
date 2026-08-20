export default function Member({ data, children, contextMenuHandler }) {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        contextMenuHandler(data);
      }}
    >
      <img src={data.image} alt={`${data.username} picture`} />
      <div className={styles.text}>
        <h3>
          {data.username} <span>{data.role === "ADMIN" ? "ADMIN" : ""}</span>
        </h3>
      </div>
      {children}
    </div>
  );
}
