import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-sans antialiased relative z-0 flex flex-col">
      <Topbar />

      {/* Đã sửa: Gỡ bỏ flex-col và items-center, dùng block mặc định */}
      <main className="flex-1 w-full relative z-10 block">
        {/* Wrapper này sẽ đảm bảo độ rộng tối đa 7xl và căn giữa hoàn hảo */}
        <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">
          <Outlet />
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
    </div>
  );
};

export default MainLayout;
