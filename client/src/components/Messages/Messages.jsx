import styles from "./Messages.module.css";
import Image from "../Image/Image";
import Menu from "../Menu/Menu";

export default function Messages({
  messages,
  scrollHandler,
  currentUserId,
  menu = { options, buttonHandler },
}) {
  return (
    <div className={styles.messagesContainer}>
      <div
        className={styles.messages}
        onLoad={(event) => {
          event.currentTarget.scrollTo({
            top: event.currentTarget.scrollHeight,
          });
        }}
        onScroll={async (event) => {
          const element = event.currentTarget;
          if (element.scrollTop === 0) await scrollHandler();
        }}
      >
        {messages.length ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={styles.messageContainer}
              style={{
                justifyContent:
                  currentUserId === message.authorId ? "end" : "start",
              }}
            >
              <div className={styles.message}>
                {currentUserId === message.authorId && (
                  <Menu
                    options={menu.options}
                    buttonHandler={() => menu.buttonHandler(message)}
                  />
                )}
                {message.content && <p>{message.content}</p>}
                {message.attachment && <Image src={message.attachment} />}
                <span>{new Date(message.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div>Start a convesation :)</div>
        )}
      </div>
    </div>
  );
}
