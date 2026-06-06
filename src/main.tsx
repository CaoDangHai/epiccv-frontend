import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./styles/index.css";
import AppRoutes from "./routes/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster containerStyle={{ zIndex: 9999999 }} />
    <AppRoutes />
  </React.StrictMode>
);
