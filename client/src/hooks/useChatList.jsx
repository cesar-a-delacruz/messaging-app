import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { useEffect, useState } from "react";

/**
 * Gets and sorts all the chats of the logged user
 * @returns {[Object, SetStateAction]}
 */
export default function useChatList() {
  const [chats, setChats] = useState({});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(
        `chat/user/${sessionHandler.user().id}`,
      );

      if (response.error) return setChats(response);

      response.data.sort(
        (a, b) =>
          new Date(b.messages[0].createdAt).getTime() -
          new Date(a.messages[0].createdAt).getTime(),
      );

      setChats(response);
    })();
  }, []);

  return [chats, setChats];
}
