import requestHandler from "@/handlers/requestHandler";
import { useEffect, useState } from "react";

/**
 * Gets a response from a specific endpoint
 * @param {string} endpoint The endpoint path.
 * @returns {[Object, SetStateAction]}
 */
export default function useGet(endpoint) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(endpoint);
      setResponse(response);
    })();
  }, []);

  return [response, setResponse];
}
