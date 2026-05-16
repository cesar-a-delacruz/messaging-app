import { Routes, Route } from "react-router-dom";

export default function GroupRoutes() {
  return (
    <Routes>
      <Route path="groups">
        <Route path=":groupId" />
        <Route path=":groupId/info" />
      </Route>
    </Routes>
  );
}
