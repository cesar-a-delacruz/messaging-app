const fields = [
  {
    id: "id",
    type: "hidden",
  },
  {
    id: "content",
    type: "textarea",
  },
  {
    id: "attachment",
    type: "file",
  },
  {
    id: "authorId",
    type: "hidden",
  },
  {
    id: "chatId",
    type: "hidden",
  },
];

export const create = [
  { fields: [fields[1], fields[2], fields[3], fields[4]] },
];

export const edit = [{ fields: [fields[1]] }];

export const remove = [{ fields: [fields[0]] }];
