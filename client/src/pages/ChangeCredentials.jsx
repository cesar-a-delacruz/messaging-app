import { changeCredentialsFields } from "@/schemas/userSchema";
import Form from "@/components/Form/Form";
import requestHandler from "@/handlers/requestHandler";
import { useLocation } from "react-router-dom";
import removeEmptyFields from "@/utils/js/removeEmptyFields";

export default function ChangeCredentials() {
  const locationState = useLocation().state;

  changeCredentialsFields[0].value = locationState.id;
  changeCredentialsFields[1].value = locationState.username;

  return (
    <div className="page">
      <h2>Change Credentials</h2>
      <Form
        fields={changeCredentialsFields}
        submit={{ text: "Enter", handler: submitHandler }}
      />
    </div>
  );

  async function submitHandler(data) {
    const newCredentials = await requestHandler.put(
      removeEmptyFields(data),
      "auth/credentials",
    );
    if (newCredentials) return alert(newCredentials.error);

    location.replace("profile/user");
  }
}
