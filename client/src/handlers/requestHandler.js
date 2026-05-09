import formatErrors from "@/utils/js/formatErrors.js";

export default {
  get: async (path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    if (!response.ok) return formatErrors(response);
    return await response.json();
  },
  post: async (data, path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: new URLSearchParams(data),
    });

    if (!response.ok) return formatErrors(response);
    return await response.json();
  },
  postFile: async (data, path) => {
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }

    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    });

    if (!response.ok) return formatErrors(response);
    return await response.json();
  },
  put: async (data, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${data.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: new URLSearchParams(data),
      },
    );

    if (!response.ok) return formatErrors(response);
    return await response.json();
  },
  delete: async (id, path) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/${path}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      },
    );

    if (!response.ok) return formatErrors(response);
    return await response.json();
  },
};
