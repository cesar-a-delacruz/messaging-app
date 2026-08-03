import { useLocation } from "react-router-dom";
import { useRef } from "react";
import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { allFields } from "@/schemas/messageSchema";
import useMessages from "@/hooks/useMessages";
import Form from "@/components/Form";
import Menu from "@/components/Menu";
import Dialog from "@/components/Dialog";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormField from "@/components/FormField";
import styles from "./styles/Chat.module.css";

export default function Chat() {
  const locationState = useLocation().state;
  if (!locationState) return location.replace("/");
  const [messages, setMessages] = useMessages(locationState);
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  allFields[2].value = sessionHandler.user().id;
  allFields[3].value = messages.data ? messages.data.chatId : "";

  if (!messages.data)
    return (
      <Loader text={!messages.error ? "Getting messages..." : messages.error} />
    );

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div
          className={styles.data}
          onClick={() =>
            location.assign(
              `/profile/${locationState.chat.type}/${locationState.id}`,
            )
          }
        >
          <img
            src={locationState.image}
            alt={`${locationState.title} picture`}
          />
          <h3>{locationState.title}</h3>
        </div>
      </div>
      <div className={styles.messages}>
        {messages.data.messages.length ? (
          messages.data.messages.map((message) => (
            <Message
              key={message.id}
              data={message}
              styleJustifyContent={
                message.authorId === sessionHandler.user().id ? "end" : "start"
              }
              contextMenuHandler={(message) => {
                if (message.authorId === sessionHandler.user().id)
                  setMessages({
                    ...messages,
                    data: {
                      ...messages.data,
                      selected: message,
                    },
                  });
              }}
            >
              {messages.data.selected.id === message.id && (
                <Menu
                  options={[
                    {
                      text: "Edit",
                      handler: () => editDialog.current.showModal(),
                    },
                    {
                      text: "Delete",
                      handler: () => deleteDialog.current.showModal(),
                    },
                  ]}
                />
              )}
            </Message>
          ))
        ) : (
          <div>{messages.message}</div>
        )}
        <Dialog ref={editDialog}>
          <FormField
            properties={allFields[0]}
            value={messages.data.selected.content || ""}
            changeHandler={(id, value) =>
              setMessages({
                ...messages,
                data: {
                  ...messages.data,
                  selected: { ...messages.data.selected, [id]: value },
                },
              })
            }
          />
          <button onClick={() => editHandler()}>Edit</button>
        </Dialog>
        <Dialog ref={deleteDialog}>
          <p>Are you sure you want to delete this message?</p>
          <FormField
            properties={allFields[3]}
            value={messages.data.selected.id || ""}
          />
          <button onClick={() => deleteHandler()}>Yes</button>
        </Dialog>
      </div>
      <div className={styles.footer}>
        <Form
          fields={allFields.filter((field) => field.id !== "id")}
          submit={{ text: "Send", handler: submitHandler }}
        />
      </div>
    </div>
  );

  async function submitHandler(message) {
    if (!messages.data.chatId && locationState.chat.type === "user") {
      const chat = await requestHandler.post({}, "chat");

      const loggedMember = await requestHandler.post(
        { chatId: chat.data.id, userId: sessionHandler.user().id },
        "chatMember",
      );
      if (loggedMember.error) return alert(loggedMember.error);
      const otherMember = await requestHandler.post(
        { chatId: chat.data.id, userId: locationState.id },
        "chatMember",
      );
      if (otherMember.error) return alert(otherMember.error);

      message.chatId = chat.data.id;
    }

    const send = await requestHandler.postFile(message, "message");
    if (send.error) return alert(send.error);

    setMessages({
      ...messages,
      data: {
        ...messages.data,
        messages: [...messages.data.messages, send.data],
      },
    });
  }
  async function editHandler() {
    const messageContent = {
      id: messages.data.selected.id,
      content: messages.data.selected.content,
    };
    const edited = await requestHandler.put(messageContent, "message");
    if (edited) return alert(edited.error);

    setMessages({
      ...messages,
      data: {
        ...messages.data,
        messages: messages.data.messages.map((m) => {
          if (m.id == messageContent.id) m.content = messageContent.content;
          return m;
        }),
      },
    });
    editDialog.current.close();
  }
  async function deleteHandler() {
    const removed = await requestHandler.delete(
      messages.data.selected.id,
      "message",
    );
    if (removed) return alert(removed.error);

    setMessages({
      ...messages,
      data: {
        ...messages.data,
        messages: messages.data.messages.filter(
          (m) => m.id !== messages.data.selected.id,
        ),
      },
    });
    deleteDialog.current.close();
  }
}
