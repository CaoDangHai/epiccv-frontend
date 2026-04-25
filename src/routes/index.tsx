import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { SignIn } from "../features/auth/components/SignIn";
import { SignUp } from "../features/auth/components/SignUp";
import MainLayout from "../layouts/MainLayout";
import { HomeView } from "../features/home"; // Import Feature Home
import { AnalysisView } from "../features/analysis";
import { HistoryView } from "../features/history";
import { SettingsView } from "../features/settings";
import { ProfileView } from "../features/profile";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* Routes Không cần Layout (Auth) */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Routes Cần Layout (Đã Login) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeView />} />
        {/* Sau này bạn có thể thêm /history, /settings vào đây */}
        <Route path="/analysis" element={<AnalysisView />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;