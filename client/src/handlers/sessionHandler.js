import formatErrors from "@/utils/js/formatErrors";
import { jwtDecode } from "jwt-decode";

/**
 * Handles requests related to the user's jwt sessions
 */
export default {
  user: () => {
    const token = localStorage.getItem("jwt");
    return token ? jwtDecode(token) : null;
  },
  login: async (credentials) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/auth`, {
      method: "POST",
      body: new URLSearchParams(credentials),
    });

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("jwt", json.token);
      return;
    }
    return formatErrors(response);
  },
  logout: () => {
    localStorage.removeItem("jwt");
    location.reload();
  },
  refresh: async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/refresh/${id}`,
    );

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("jwt", json.token);
      return;
    }

    return formatErrors(response);
  },
};
