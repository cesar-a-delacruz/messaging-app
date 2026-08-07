import sessionHandler from "@/handlers/sessionHandler";
import { loginFields } from "@/schemas/userSchema";
import Form from "@/components/Form";

export default function Login() {
  return (
    <div className="page">
      <h2>Login</h2>
      <Form
        fields={loginFields}
        submit={{ text: "Enter", handler: submitHandler }}
      />
      <p>
        Don't have an account? Register <a href="/register">here</a>
      </p>
    </div>
  );

  async function submitHandler(credentials) {
    const login = await sessionHandler.login(credentials);
    if (!sessionHandler.user()) return alert(login.error);
    location.replace("/");
  }
}
