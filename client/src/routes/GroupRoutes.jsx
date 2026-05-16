import { Routes, Route } from "react-router-dom";
import Main from "@/layouts/Main";
import GroupIndex from "@/pages/Group/GroupIndex";
import GroupInfo from "@/pages/Group/GroupInfo";
import GroupMessages from "@/pages/Group/GroupMessages";

export default function GroupRoutes() {
  return (
    <Routes>
      <Route path="groups" element={<Main />}>
        <Route index element={<GroupIndex />} />
        <Route path=":groupId" element={<GroupMessages />} />
        <Route path=":groupId/info" element={<GroupInfo />} />
      </Route>
    </Routes>
  );
}
