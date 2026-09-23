import defaultPagestyles from "@/utils/css/modules/defaultPage.module.css";
import sessionHandler from "@/handlers/sessionHandler";
import { login } from "@/fieldsets/userFieldsets";
import Form from "@/components/Form/Form";

export default function Login() {
  document.title = `${import.meta.env.VITE_TITLE}: Login`;

  return (
    <div className={`page ${defaultPagestyles.default}`}>
      <h2>Login</h2>
      <Form
        fieldsets={login}
        initialData={{}}
        submit={{ text: "Enter", handler: submitHandler, disable: true }}
      />
      <p className={defaultPagestyles.textBottom}>
        Don't have an account? Register{" "}
        <a href="/register" className="link">
          here
        </a>
      </p>
    </div>
  );

  async function submitHandler(data) {
    const login = await sessionHandler.login(data);
    if (!login) return location.replace("/");
    return login;
  }
}
