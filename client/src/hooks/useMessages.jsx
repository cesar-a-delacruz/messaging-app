import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { useEffect, useState } from "react";

/**
 * Gets all messages of a chat after verifying it exists
 * @returns {[Object, SetStateAction]}
 */
export default function useMessages(chatId, userId) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    (async () => {
      let response = {};
      if (chatId) response = await requestHandler.get(`message/chat/${chatId}`);
      else {
        response = await requestHandler.get(
          `chat/loggedUser/${sessionHandler.user().id}/otherUser/${userId}`,
        );
        if (response.error) {
          response.message = "Start a convesation :)";
          response.data = [];
        } else response.data = response.data.messages;
      }

      setMessages(response);
    })();
  }, []);

  return [messages, setMessages];
}
