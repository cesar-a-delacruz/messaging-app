import { Routes, Route } from "react-router-dom";
import Default from "@/layouts/Default";
import Main from "@/layouts/Main";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import MyChats from "@/pages/MyChats";
import Users from "@/pages/Users";
import UserProfile from "@/pages/UserProfile";
import GroupProfile from "@/pages/GroupProfile";
import Chat from "@/pages/Chat";
import Groups from "@/pages/Groups";
import NewGroup from "@/pages/NewGroup";
import ChangeCredentials from "@/pages/ChangeCredentials";

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
        <Route path="groups/new" element={<NewGroup />} />
        <Route path="profile/user/:id?" element={<UserProfile />} />
        <Route path="profile/group/:id" element={<GroupProfile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="credentials" element={<ChangeCredentials />} />
      </Route>
    </Routes>
  );
}
