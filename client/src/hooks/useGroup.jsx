import requestHandler from "@/handlers/requestHandler";
import sessionHandler from "@/handlers/sessionHandler";
import { useEffect, useState } from "react";

/**
 * Gets a group's chat and its members
 * @param {string} id The group id.
 * @returns {[Object, SetStateAction]}
 */
export default function useGroup(id) {
  const [group, setGroup] = useState({});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(`group/${id}`);

      if (response.data) {
        response.data.chats = response.data.chats[0];
        for (const member of response.data.chats.chatMembers) {
          if (member.user.id === sessionHandler.user().id)
            response.data.currentMember = member;
        }
      }

      setGroup(response);
    })();
  }, [id]);

  return [group, setGroup];
}
