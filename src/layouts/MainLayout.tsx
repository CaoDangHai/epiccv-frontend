import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] font-sans antialiased relative z-0">
            <Topbar />
            <div className="flex min-h-[calc(100vh-64px)]">
                <Sidebar />
                {/* Vùng render nội dung các trang con (như HomeView) */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
        </div>
    );
};

export default MainLayout;