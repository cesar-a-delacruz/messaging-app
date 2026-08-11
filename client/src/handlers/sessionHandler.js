import formatErrors from "@/utils/js/formatErrors";
import { jwtDecode } from "jwt-decode";

/**
 * Handles requests related to the user's jwt sessions
 */
export default {
  login: async (credentials) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/auth`, {
      method: "POST",
      body: new URLSearchParams(credentials),
      credentials: "include",
    });
    if (response.ok) {
      const json = await response.json();
      // localStorage.setItem("jwt", json.token);
      return;
    }
    return formatErrors(response);
  },
  logout: async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`);

    if (response.ok) {
      // localStorage.removeItem("jwt");
      location.reload();
      return;
    }
    return formatErrors(response);
  },
  refresh: async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/auth/refresh/${id}`,
    );

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("jwt", json.token);
      return;
    }

    return formatErrors(response);
  },
};
