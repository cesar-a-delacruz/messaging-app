const fields = [
  {
    id: "image",
    type: "file",
  },
  {
    id: "name",
    value: "",
    label: "Name",
    type: "text",
  },
  {
    id: "info",
    value: "",
    label: "Info",
    type: "textarea",
  },
];

export const edit = [
  {
    fields: [...fields],
  },
];

export const create = [
  {
    fields: [...fields],
  },
];
