import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SignIn } from "../features/auth/components/SignIn";
import { SignUp } from "../features/auth/components/SignUp";
import MainLayout from "../layouts/MainLayout";
import { HomeView } from "../features/home";
import { AnalysisView } from "../features/analysis";
import { SettingsView } from "../features/settings";
import { MezonCallback } from "../features/auth/components/MezonCallback";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* Routes Không cần Layout (Auth) */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/auth/mezon/callback" element={<MezonCallback />} />

      {/* Routes Cần Layout (Đã Login) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/analysis" element={<AnalysisView />} />
        <Route path="/analysis/:id" element={<AnalysisView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
