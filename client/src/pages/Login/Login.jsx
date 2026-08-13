import styles from "./Login.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import { loginFields } from "@/schemas/userSchema";
import Form from "@/components/Form/Form";

export default function Login() {
  document.title = `${import.meta.env.VITE_TITLE}: Login`;

  return (
    <div className={styles.page}>
      <h2>Login</h2>
      <Form
        fields={loginFields}
        submit={{ text: "Enter", handler: submitHandler }}
      />
      <p>
        Don't have an account? Register{" "}
        <a className={styles.link} href="/register">
          here
        </a>
      </p>
    </div>
  );

  async function submitHandler(data) {
    const login = await sessionHandler.login(data);
    if (login) return alert(login.error);
    location.replace("/");
  }
}
