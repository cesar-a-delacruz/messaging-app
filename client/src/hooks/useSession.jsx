import { useEffect, useState } from "react";

/**
 * Verifies the session status
 * @param {boolean} initial The state needed to render the page.
 * @returns {boolean}
 */
export default function useSession(initial) {
  const [response, setResponse] = useState(initial);

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `${import.meta.env.VITE_SERVER}/auth/status`,
        { credentials: "include" },
      );

      if (request.ok) setResponse(true);
      else setResponse(false);
    })();
  }, []);

  return response;
}
