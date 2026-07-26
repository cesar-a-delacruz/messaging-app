import { Routes, Route } from "react-router-dom";
import Default from "@/layouts/Default";
import Main from "@/layouts/Main";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MyChats from "@/pages/MyChats";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Chat from "@/pages/Chat";
import Groups from "@/pages/Groups";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Main />}>
        <Route index element={<MyChats />} />
        <Route path="users" element={<Users />} />
        <Route path="groups" element={<Groups />} />
        <Route path="profile/:userId?" element={<Profile />} />
        <Route path="chat/:chatId?" element={<Chat />} />
      </Route>
    </Routes>
  );
}
