import styles from "./Message.module.css";
import Menu from "../Menu/Menu";
import Image from "@/components/Image/Image";

export default function Message({
  data,
  options = [],
  menuHandler,
  isCurrentUserAuthor,
}) {
  return (
    <div
      className={styles.container}
      style={{
        justifyContent: isCurrentUserAuthor ? "end" : "start",
      }}
    >
      <div className={styles.message}>
        {isCurrentUserAuthor && (
          <Menu options={options} buttonHandler={menuHandler} />
        )}
        {data.content && <p>{data.content}</p>}
        {data.attachment && <Image src={data.attachment} />}
        <span>{data.createdAt}</span>
      </div>
    </div>
  );
}
