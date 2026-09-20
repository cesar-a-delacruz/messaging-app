import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import { DisplayProvider } from "./contexts/DisplayContext";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <DisplayProvider>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </DisplayProvider>,
  // </StrictMode>,
);
