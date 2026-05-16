import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import GroupRoutes from "./routes/GroupRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserRoutes />
      <GroupRoutes />
    </BrowserRouter>
  </StrictMode>,
);
