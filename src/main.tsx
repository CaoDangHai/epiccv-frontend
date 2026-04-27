import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import "./styles/index.css";
// ĐÃ XÓA: import "antd/dist/reset.css" để tránh lỗi module not found và xung đột với Tailwind v4.
import AppRoutes from "./routes/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);