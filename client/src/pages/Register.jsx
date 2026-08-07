import requestHandler from "@/handlers/requestHandler";
import { registerFields } from "@/schemas/userSchema";
import Form from "@/components/Form";

export default function Register() {
  return (
    <div className="page">
      <h2>Register</h2>
      <Form
        fields={registerFields}
        submit={{ text: "Create Account", handler: submitHandler }}
      />
      <p>
        Already have an account? Login <a href="/login">here</a>
      </p>
    </div>
  );

  async function submitHandler(userData) {
    if (userData.password !== userData.confirm)
      return alert("The passwords don't match");

    const register = await requestHandler.postFile(userData, "user");
    if (register.error) return alert(register.error);
    location.replace("/login");
  }
}
