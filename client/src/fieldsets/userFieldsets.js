const fields = [
  {
    id: "id",
    value: "",
    type: "hidden",
  },
  {
    id: "username",
    value: "",
    placeholder: "johnsmith",
    label: "Username",
    type: "text",
  },
  {
    id: "fullname",
    value: "",
    placeholder: "John Smith",
    label: "Full name",
    type: "text",
  },
  {
    id: "password",
    value: "",
    label: "Password",
    type: "password",
  },
  {
    id: "bio",
    value: "",
    placeholder: "Hello everyone!",
    label: "Bio",
    type: "textarea",
  },
  {
    id: "image",
    type: "file",
  },
];
export const login = [{ fields: [fields[1], fields[3]] }];

export const create = [
  {
    legend: "Credentials",
    fields: [
      fields[1],
      fields[3],
      {
        id: "confirm",
        value: "",
        label: "Confirm password",
        type: "password",
      },
    ],
  },
  { legend: "About you", fields: [fields[5], fields[2], fields[4]] },
];

export const edit = [
  {
    fields: [
      { ...fields[5], disabled: false },
      { ...fields[2], disabled: false },
      { ...fields[4], disabled: false },
    ],
  },
  { fields: [fields[0], fields[1], fields[3]] },
];
