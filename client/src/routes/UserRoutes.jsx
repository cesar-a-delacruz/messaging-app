import { Routes, Route } from "react-router-dom";
import Default from "@/layouts/Default";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="login" />
        <Route path="register" />
      </Route>
      <Route path="/">
        <Route index />
        <Route path="chat/:userId" />
        <Route path="profile/:userId?" />
      </Route>
    </Routes>
  );
}
