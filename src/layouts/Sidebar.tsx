import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    // Hàm helper để tái sử dụng logic class cho gọn code
    const getNavLinkClass = (isActive: boolean) => {
        return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`;
    };

    return (
        <aside className="hidden md:flex flex-col py-6 px-4 space-y-2 h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-slate-50 sticky top-16 text-sm">
            <div className="flex-1 space-y-1">

                {/* Tab Workspace */}
                <NavLink to="/home" className={({ isActive }) => getNavLinkClass(isActive)}>
                    <span className="material-symbols-outlined">folder_open</span>
                    <span>Workspace</span>
                </NavLink>

                {/* SỬA: Đổi button thành NavLink trỏ tới /analysis */}
                <NavLink to="/analysis" className={({ isActive }) => getNavLinkClass(isActive)}>
                    <span className="material-symbols-outlined">analytics</span>
                    <span>Reports</span>
                </NavLink>

                {/* SỬA: Đổi button thành NavLink trỏ tới /history */}
                <NavLink to="/history" className={({ isActive }) => getNavLinkClass(isActive)}>
                    <span className="material-symbols-outlined">history</span>
                    <span>History</span>
                </NavLink>

                {/* SỬA: Đổi button thành NavLink trỏ tới /settings */}
                <NavLink to="/settings" className={({ isActive }) => getNavLinkClass(isActive)}>
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </NavLink>

                <div className="pt-4 px-2">
                    <button className="w-full py-3 px-4 bg-[var(--color-primary)] text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Analysis
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;