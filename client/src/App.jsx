import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import GroupRoutes from "./routes/GroupRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" />
      </Routes>

      <UserRoutes />
      <GroupRoutes />
    </BrowserRouter>
  </StrictMode>,
);
