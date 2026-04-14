import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GgSwitchPage from "../pages/GgSwitch/index";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GgSwitchPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
