export const allFields = [
  {
    id: "id",
    value: "",
    type: "hidden",
  },
  {
    id: "username",
    value: "",
    label: "Username",
    type: "text",
  },
  {
    id: "fullname",
    value: "",
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
    label: "Bio",
    type: "textarea",
  },
  {
    id: "image",
    label: "Image",
    type: "file",
  },
];

export const loginFields = [allFields[1], allFields[3]];

export const changeCredentialsFields = [
  allFields[0],
  allFields[1],
  allFields[3],
];

export const registerFields = [
  allFields[1],
  allFields[2],
  allFields[3],
  {
    id: "confirm",
    value: "",
    label: "Confirm password",
    type: "password",
  },
  allFields[4],
  allFields[5],
];
