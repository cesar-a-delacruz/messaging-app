import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import GroupRoutes from "./routes/GroupRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>

      <UserRoutes />
      <GroupRoutes />
    </BrowserRouter>
  </StrictMode>,
);
