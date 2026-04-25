import React from 'react';
import { useTopbar } from './useTopbar';
import epiccvLogo from '../assets/epiccv-logo.png';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
    const navigate = useNavigate();
    const {
        showNotifications, showProfileMenu, showLogoutConfirm,
        setShowLogoutConfirm, headerRef, toggleNotifications,
        toggleProfileMenu, handleLogout
    } = useTopbar();

    // Hàm phụ trợ: Chuyển trang và tự động đóng menu
    const handleNavigate = (path: string) => {
        navigate(path);
        if (showProfileMenu) toggleProfileMenu();
    };

    return (
        <>
            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-transparent">
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Xác nhận đăng xuất</h3>
                        <p className="text-slate-600 mb-6">Bạn có chắc chắn muốn đăng xuất khỏi EpicCV?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 rounded-xl font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Hủy</button>
                            <button onClick={handleLogout} className="flex-1 py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors">Đăng Xuất</button>
                        </div>
                    </div>
                </div>
            )}

            <header ref={headerRef} className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
                    <img src={epiccvLogo} alt="EpicCV Logo" className="h-8 w-8 object-contain" />
                    <span className="text-xl font-bold tracking-tighter text-[var(--color-primary)]">EpicCV</span>
                </div>
                <div className="flex items-center gap-4 relative">
                    <div className="relative">
                        <button onClick={toggleNotifications} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-95 relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                    <div className="relative">
                        <button onClick={toggleProfileMenu} className="flex items-center gap-1 group cursor-pointer pl-2">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
                                <span className="material-symbols-outlined text-slate-500">person</span>
                            </div>
                            <span className={`material-symbols-outlined text-[20px] text-slate-500 group-hover:text-[var(--color-primary)] transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-slate-100">
                                    <p className="font-bold text-slate-900 text-sm">Alex Johnson</p>
                                    <p className="text-xs text-slate-500">alex.j@example.com</p>
                                </div>
                                <div className="py-2 border-b border-slate-100">
                                    <button
                                        onClick={() => handleNavigate('/profile')}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-slate-400">person</span> Account
                                    </button>

                                    {/* NÚT SETTINGS ĐÃ ĐƯỢC GẮN ROUTE TẠI ĐÂY */}
                                    <button
                                        onClick={() => handleNavigate('/settings')}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-slate-400">settings</span> Settings
                                    </button>
                                </div>
                                <div className="py-2">
                                    <button onClick={() => setShowLogoutConfirm(true)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">logout</span>Log Out
                                    </button>
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