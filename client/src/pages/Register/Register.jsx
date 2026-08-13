import styles from "./Register.module.css";
import requestHandler from "@/handlers/requestHandler";
import { registerFields } from "@/schemas/userSchema";
import Form from "@/components/Form/Form";
import removeEmptyFields from "@/utils/js/removeEmptyFields";

export default function Register() {
  document.title = `${import.meta.env.VITE_TITLE}: Register`;

  return (
    <div className="page">
      <h2>Register</h2>
      <Form
        fields={registerFields}
        submit={{ text: "Create Account", handler: submitHandler }}
      />
      <p className={styles.textBottom}>
        Already have an account? Login{" "}
        <a href="/login" className="link">
          here
        </a>
      </p>
    </div>
  );

  async function submitHandler(data) {
    if (data.password !== data.confirm)
      return alert("The passwords don't match");

    const register = await requestHandler.postFile(
      removeEmptyFields(data),
      "user",
    );
    if (register.error) return alert(register.error);

    location.replace("/login");
  }
}
