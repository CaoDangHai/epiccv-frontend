import React from "react";
import { useTopbar } from "./useTopbar";
import epiccvLogo from "../assets/epiccv-logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { mockNotifications } from "./mockData";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const {
    showNotifications,
    showProfileMenu,
    showLogoutConfirm,
    setShowLogoutConfirm,
    headerRef,
    toggleNotifications,
    toggleProfileMenu,
    handleLogout,
  } = useTopbar();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (showProfileMenu) toggleProfileMenu();
  };

  // Đếm số lượng thông báo chưa đọc
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <>
      {/* Modal Xác nhận Đăng xuất */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-transparent">
            <h3 className="text-xl font-bold mb-2 text-slate-900">Confirm Logout</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to log out of EpicCV?</p>
            <div className="flex gap-3">
              <Button
                variant="unstyled"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </Button>
              <Button
                variant="unstyled"
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}

      <header
        ref={headerRef}
        className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300"
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/home")}>
          <img src={epiccvLogo} alt="EpicCV Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold tracking-tighter text-[var(--color-primary)]">
            EpicCV
          </span>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* --- KHU VỰC THÔNG BÁO --- */}
          <div className="relative">
            <Button
              variant="unstyled"
              onClick={toggleNotifications}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-95 relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              {/* Hiển thị chấm đỏ nếu có thông báo chưa đọc */}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </Button>

            {/* Bảng Dropdown Thông Báo */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {unreadCount} New
                  </span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${notification.unread ? "bg-blue-50/40" : ""}`}
                    >
                      <h4
                        className={`text-sm ${notification.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}
                      >
                        {notification.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <span className="text-xs font-bold text-blue-600">Mark all as read</span>
                </div>
              </div>
            )}
          </div>

          {/* --- KHU VỰC MENU PROFILE --- */}
          <div className="relative">
            <Button
              variant="unstyled"
              onClick={toggleProfileMenu}
              className="flex items-center gap-1 group cursor-pointer pl-2"
            >
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
                <span className="material-symbols-outlined text-slate-500">person</span>
              </div>
              <span
                className={`material-symbols-outlined text-[20px] text-slate-500 group-hover:text-[var(--color-primary)] transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </Button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">Alex Johnson</p>
                  <p className="text-xs text-slate-500">alex.j@example.com</p>
                </div>
                <div className="py-2 border-b border-slate-100">
                  <Button
                    variant="unstyled"
                    onClick={() => handleNavigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      person
                    </span>{" "}
                    Account
                  </Button>
                  <Button
                    variant="unstyled"
                    onClick={() => handleNavigate("/settings")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      settings
                    </span>{" "}
                    Settings
                  </Button>
                </div>
                <div className="py-2">
                  <Button
                    variant="unstyled"
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>Log Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
