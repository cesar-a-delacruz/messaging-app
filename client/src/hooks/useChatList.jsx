import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { useEffect, useState } from "react";

/**
 * Gets and sorts all the chats of the logged user
 * @returns {Object}
 */
export default function useChatList() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    (async () => {
      const request = await requestHandler.get(
        `chat/user/${sessionHandler.user().id}`,
      );

      if (request.error) return setResponse(request);

      request.data.sort(
        (a, b) =>
          new Date(b.messages[0].createdAt).getTime() -
          new Date(a.messages[0].createdAt).getTime(),
      );

      setResponse(request.data);
    })();
  }, []);

  return response;
}
