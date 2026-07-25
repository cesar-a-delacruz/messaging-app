import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { useEffect, useState } from "react";

/**
 * Gets all messages of a chat after verifying it exists
 * @returns {[Object, SetStateAction]}
 */
export default function useMessages(item) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    (async () => {
      let response = {};
      switch (item.type) {
        case "chat":
          response = await requestHandler.get(`message/chat/${item.id}`);
          break;
        case "user":
          response = await requestHandler.get(
            `chat/loggedUser/${sessionHandler.user().id}/otherUser/${item.id}`,
          );
          if (response.data) {
            response.chatId = response.data.id;
            response.data = response.data.messages;
          }
          break;
        case "group":
          response = await requestHandler.get(
            `chat/user/${sessionHandler.user().id}/group/${item.id}`,
          );
          if (response.data) {
            response.chatId = response.data.id;
            response.data = response.data.messages;
          }
          break;
      }

      if (response.error) {
        response.message = "Start a convesation :)";
        response.data = [];
      }

      response.data.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

      setMessages(response);
    })();
  }, []);

  return [messages, setMessages];
}
