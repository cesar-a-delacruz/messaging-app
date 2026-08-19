export const allFields = [
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
  {
    id: "image",
    type: "file",
  },
];

export const profileFields = [
  {
    fields: [allFields[2], allFields[0], allFields[1]],
  },
];
