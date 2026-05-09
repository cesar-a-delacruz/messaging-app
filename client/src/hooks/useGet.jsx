import requestHandler from "@/handlers/requestHandler";
import { useEffect, useState } from "react";

/**
 * Gets a response from a specific endpoint
 * @param {string} endpoint The endpoint path.
 * @returns {[Object, SetStateAction]}
 */
export default function useGet(endpoint) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await requestHandler.get(endpoint);
      setData(response);
    })();
  }, []);

  return [data, setData];
}
