import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-sans antialiased relative z-0 flex flex-col">
      <Topbar />
      <main className="flex-1 w-full relative z-10 block">
        <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
