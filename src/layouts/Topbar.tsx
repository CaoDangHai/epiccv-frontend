// File: src/layouts/Topbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useTopbar } from "./useTopbar";
import epiccvLogo from "../assets/epiccv-logo.png";
import { Button } from "../components/ui/Button";
import { mockNotifications } from "./mockData";

const Topbar: React.FC = () => {
  const {
    showNotifications,
    showProfileMenu,
    showLogoutConfirm,
    setShowLogoutConfirm,
    isMobileMenuOpen,
    headerRef,
    toggleNotifications,
    toggleProfileMenu,
    toggleMobileMenu,
    handleLogout,
    handleNavigate,
  } = useTopbar();

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  const getDesktopNavLinkClass = (isActive: boolean) => {
    return `flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
      isActive
        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
        : "text-slate-600 hover:bg-slate-100 font-medium"
    }`;
  };

  const getMobileNavLinkClass = (isActive: boolean) => {
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
        : "text-slate-600 hover:bg-slate-50 font-medium"
    }`;
  };

  return (
    <>
      {/* Modal Xác nhận Đăng xuất (Giữ nguyên) */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2 text-slate-900">Confirm Logout</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to log out of EpicCV?</p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl"
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleLogout} className="flex-1 py-3 rounded-xl">
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}

      <header ref={headerRef} className="bg-white border-b border-slate-200 sticky top-0 z-50">
        {/* Cấu trúc lại layout Desktop:
          - Dùng 'justify-between' tổng thể cho 3 block: Left, Center, Right.
        */}
        <div className="h-16 flex items-center justify-between px-4 md:px-8">
          {/* 1. Block TRÁI: Logo (Đã tách khỏi Desktop Nav cũ) */}
          <div className="flex items-center flex-none">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavigate("/home")}
            >
              <img src={epiccvLogo} alt="EpicCV Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold tracking-tighter text-[var(--color-primary)]">
                EpicCV
              </span>
            </div>
          </div>

          {/* 2. Block GIỮA: Desktop Navigation */}
          {/* Thêm 'hidden md:flex flex-1 justify-center' để canh giữa */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <NavLink to="/home" className={({ isActive }) => getDesktopNavLinkClass(isActive)}>
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              Workspace
            </NavLink>
            <NavLink to="/analysis" className={({ isActive }) => getDesktopNavLinkClass(isActive)}>
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              Reports
            </NavLink>
          </nav>

          {/* 3. Block PHẢI: Actions */}
          {/* Thêm 'flex-none justify-end' để block này không chiếm chỗ của Center Nav */}
          <div className="flex items-center gap-2 md:gap-4 flex-none justify-end">
            {/* ĐÃ XÓA: Nút New Analysis ở đây */}

            {/* Notification Menu (Giữ nguyên) */}
            <div className="relative">
              <Button
                variant="unstyled"
                onClick={toggleNotifications}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {unreadCount} New
                    </span>
                  </div>
                  {/* ... code list thông báo cũ ... */}
                  <div className="max-h-[300px] overflow-y-auto">
                    {mockNotifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                          notifications_off
                        </span>
                        <p className="text-sm">You have no notifications.</p>
                      </div>
                    ) : (
                      mockNotifications.map((n, index) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition ${index === mockNotifications.length - 1 ? "border-b-0" : ""} ${n.unread ? "bg-blue-50/50" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`h-8 w-8 rounded-full flex-none flex items-center justify-center mt-0.5 ${n.unread ? "bg-blue-100" : "bg-slate-100"}`}
                            >
                              <span
                                className={`material-symbols-outlined text-[18px] ${n.unread ? "text-blue-600" : "text-slate-500"}`}
                              >
                                notifications
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${n.unread ? "font-semibold text-slate-900" : "text-slate-700"}`}
                              >
                                {n.title}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {n.description}
                              </p>
                              <p className="text-[10px] font-medium text-slate-400 mt-1">
                                {n.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu (Giữ nguyên) */}
            <div className="relative hidden md:block">
              <Button
                variant="unstyled"
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
                  <span className="material-symbols-outlined text-slate-500 text-sm">person</span>
                </div>
                <span
                  className={`material-symbols-outlined text-[18px] text-slate-500 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </Button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">Việt Huỳnh</p>
                    <p className="text-xs text-slate-500">viet@epiccv.com</p>
                  </div>
                  <div className="py-2 border-b border-slate-100">
                    <Button
                      variant="unstyled"
                      onClick={() => handleNavigate("/profile")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px] text-slate-400">
                        person
                      </span>
                      Account
                    </Button>
                    <Button
                      variant="unstyled"
                      onClick={() => handleNavigate("/settings")}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px] text-slate-400">
                        settings
                      </span>
                      Settings
                    </Button>
                  </div>
                  <div className="py-2">
                    <Button
                      variant="unstyled"
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>Log Out
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger Button (Mobile Only) */}
            <Button
              variant="unstyled"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg animate-in slide-in-from-top-2 duration-200 flex flex-col">
            <div className="p-4 space-y-1">
              <NavLink
                to="/home"
                onClick={() => handleNavigate("/home")}
                className={({ isActive }) => getMobileNavLinkClass(isActive)}
              >
                <span className="material-symbols-outlined">folder_open</span> Workspace
              </NavLink>
              <NavLink
                to="/analysis"
                onClick={() => handleNavigate("/analysis")}
                className={({ isActive }) => getMobileNavLinkClass(isActive)}
              >
                <span className="material-symbols-outlined">analytics</span> Reports
              </NavLink>
            </div>

            <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
              <Button
                variant="unstyled"
                onClick={() => handleNavigate("/profile")}
                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-3 font-medium"
              >
                <span className="material-symbols-outlined text-slate-400">person</span> My Profile
              </Button>
              <Button
                variant="unstyled"
                onClick={() => handleNavigate("/settings")}
                className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-3 font-medium"
              >
                <span className="material-symbols-outlined text-slate-400">settings</span> Settings
              </Button>

              {/* ĐÃ XÓA: Nút New Analysis (Mobile) ở đây */}

              <Button
                variant="danger"
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full mt-2 !py-3 !bg-red-50 text-red-600 hover:!bg-red-100 shadow-none"
              >
                <span className="material-symbols-outlined">logout</span> Log Out
              </Button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Topbar;
