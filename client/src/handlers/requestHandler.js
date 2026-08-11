import formatErrors from "@/utils/js/formatErrors";

/**
 * Handles all requests for CRUD operations.
 */
export default {
  get: async (path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      credentials: "include",
    });

    if (response.ok) return await response.json();
    return formatErrors(response);
  },
  post: async (data, path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams(data),
    });

    if (response.ok) return await response.json();
    return formatErrors(response);
  },
  postFile: async (data, path) => {
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }

    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) return await response.json();
    return formatErrors(response);
  },
  put: async (data, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${data.id}`,
      {
        method: "PUT",
        credentials: "include",
        body: new URLSearchParams(data),
      },
    );

    if (response.ok) return;
    return formatErrors(response);
  },
  delete: async (id, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (response.ok) return;
    return formatErrors(response);
  },
};
