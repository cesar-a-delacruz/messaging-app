import { Routes, Route } from "react-router-dom";
import Default from "@/layouts/Default";
import Main from "@/layouts/Main";
import UserLogin from "@/pages/User/UserLogin";
import UserRegister from "@/pages/User/UserRegister";
import UserIndex from "@/pages/User/UserIndex";
import UserProfile from "@/pages/User/UserProfile";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="login" element={<UserLogin />} />
        <Route path="register" element={<UserRegister />} />
      </Route>
      <Route path="/" element={<Main />}>
        <Route index element={<UserIndex />} />
        <Route path="profile/:userId?" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}
