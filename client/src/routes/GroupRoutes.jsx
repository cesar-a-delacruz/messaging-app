import { Routes, Route } from "react-router-dom";
import Main from "@/layouts/Main";

export default function GroupRoutes() {
  return (
    <Routes>
      <Route path="groups" element={<Main />}>
        <Route index />
        <Route path=":groupId" />
        <Route path=":groupId/info" />
      </Route>
    </Routes>
  );
}
