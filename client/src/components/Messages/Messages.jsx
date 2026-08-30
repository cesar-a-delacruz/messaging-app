import styles from "./Messages.module.css";
import Image from "../Image/Image";
import Menu from "../Menu/Menu";
import { useState } from "react";

export default function Messages({
  messages,
  all,
  scrollHandler,
  currentUserId,
  menu = { options, buttonHandler },
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div className={styles.messagesContainer}>
      <div
        className={styles.messages}
        onLoad={(event) => {
          const element = event.currentTarget;
          element.scrollTo({
            top: scrollPosition || element.scrollHeight,
          });
        }}
        onScroll={async (event) => {
          const element = event.currentTarget;
          if (element.scrollTop === 0 && !all) {
            const height = element.scrollHeight;
            const stop = await scrollHandler();

            if (stop) return;
            element.scrollTo({
              top: scrollPosition,
            });
            setScrollPosition(height + 280);
          }
        }}
      >
        {messages && messages.length ? (
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
          <p className={styles.emptyChat}>Start a conversation :)</p>
        )}
      </div>
    </div>
  );
}
