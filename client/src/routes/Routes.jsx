import { Routes, Route } from "react-router-dom";
import Default from "@/layouts/Default";
import Main from "@/layouts/Main";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Friends from "@/pages/Friends";
import Profile from "@/pages/Profile";

export default function Routes() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Main />}>
        <Route index element={<Friends />} />
        <Route path="profile/:userId?" element={<Profile />} />
      </Route>
    </Routes>
  );
}
