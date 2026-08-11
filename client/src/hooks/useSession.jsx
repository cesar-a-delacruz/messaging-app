import requestHandler from "@/handlers/requestHandler";
import { useEffect, useState } from "react";

/**
 * Verifies the session status
 * @returns {boolean}
 */
export default function useSession() {
  const [response, setResponse] = useState(false);

  useEffect(() => {
    (async () => {
      const request = await fetch(`${import.meta.env.VITE_SERVER}/auth/status`);
      if (request.ok) setResponse(true);
    })();
  }, []);

  return response;
}
