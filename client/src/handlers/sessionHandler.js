import formatErrors from "@/utils/js/formatErrors";

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
    if (response.ok) return;
    return formatErrors(response);
  },
  logout: async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
      credentials: "include",
    });

    if (response.ok) {
      location.reload();
      return;
    }
    return formatErrors(response);
  },
};
