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

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("jwt", json.token);
      return;
    }

    console.error(json.error);
    return { error: json.error };
  },
  logout: () => {
    localStorage.removeItem("jwt");
    location.reload();
  },
  refresh: async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/refresh/${id}`,
    );

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("jwt", json.token);
      return;
    }

    console.error(json.error);
    return { error: json.error };
  },
};
