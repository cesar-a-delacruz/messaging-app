import styles from "./Register.module.css";
import requestHandler from "@/handlers/requestHandler";
import { register } from "@/schemas/userFieldsets";
import Form from "@/components/Form/Form";

export default function Register() {
  document.title = `${import.meta.env.VITE_TITLE}: Register`;

  return (
    <div className={`page ${styles.register}`}>
      <h2>Register</h2>
      <Form
        fieldsets={register}
        initialData={{}}
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

    const register = await requestHandler.postFile(data, "user");
    if (register.error) return alert(register.error);

    location.replace("/login");
  }
}
