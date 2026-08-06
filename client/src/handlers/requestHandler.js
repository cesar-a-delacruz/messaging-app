/**
 * Handles all requests for CRUD operations.
 */
export default {
  get: async (path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    const json = await response.json();
    if (response.ok) return json;

    console.error(json.error);
    return { error: json.error };
  },
  post: async (data, path) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: new URLSearchParams(data),
    });

    const json = await response.json();
    if (response.ok) return json;

    console.error(json.error);
    return { error: json.error };
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

    const json = await response.json();
    if (response.ok) return json;

    console.error(json.error);
    return { error: json.error };
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

    if (response.ok) return;

    const json = await response.json();
    console.error(json.error);
    return { error: json.error };
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

    if (response.ok) return;

    const json = await response.json();
    console.error(json.error);
    return { error: json.error };
  },
};
