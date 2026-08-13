export const allFields = [
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

export const loginFields = [{ fields: [allFields[1], allFields[3]] }];

export const changeCredentialsFields = [
  allFields[0],
  allFields[1],
  allFields[3],
];

export const registerFields = [
  {
    legend: "Credentials",
    fields: [
      allFields[1],
      allFields[3],
      {
        id: "confirm",
        value: "",
        label: "Confirm password",
        type: "password",
      },
    ],
  },
  { legend: "About you", fields: [allFields[5], allFields[2], allFields[4]] },
];
