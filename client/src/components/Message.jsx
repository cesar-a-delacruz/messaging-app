import Image from "./Image";

export default function Message({
  data,
  children,
  contextMenuHandler,
  styleJustifyContent,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: styleJustifyContent,
      }}
    >
      {children}
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          contextMenuHandler(data);
        }}
      >
        <span>{data.createdAt}</span>
        {data.content && <p>{data.content}</p>}
        {data.attachment && <Image src={data.attachment} />}
      </div>
    </div>
  );
}
