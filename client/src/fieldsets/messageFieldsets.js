const fields = [
  {
    id: "id",
    value: "",
    type: "hidden",
  },
  {
    id: "content",
    value: "",
    type: "textarea",
  },
  {
    id: "attachment",
    type: "file",
  },
  {
    id: "authorId",
    value: "",
    type: "hidden",
  },
  {
    id: "chatId",
    value: "",
    type: "hidden",
  },
];

export const create = [
  { fields: [fields[1], fields[2], fields[3], fields[4]] },
];

export const edit = [{ fields: [fields[1]] }];

export const remove = [{ fields: [fields[0]] }];
