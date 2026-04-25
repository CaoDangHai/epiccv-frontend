import React from 'react';
import { useSettings } from './useSettings';
import Switch from 'react-switch';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const SettingsView: React.FC = () => {
    const {
        activeTab, setActiveTab,
        isEmailNotify, setIsEmailNotify,
        isPushNotify, setIsPushNotify,
        isDarkMode, setIsDarkMode,
        isChangingPassword, setIsChangingPassword,
        supportDetail, setSupportDetail,
        showLogoutConfirm, setShowLogoutConfirm,
        supportItems,
        goBack, handleLogout
    } = useSettings();

    const getTabClass = (tabName: string) => {
        const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ";
        return tabName === activeTab
            ? baseClass + "bg-blue-50 text-[var(--color-primary)] font-semibold"
            : baseClass + "text-slate-600 hover:bg-slate-100";
    };

    return (
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto transition-colors duration-300 bg-slate-50 text-slate-900">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-300">

                {/* Nút Back sử dụng Wrapper */}
                <div className="mb-6">
                    <Button
                        variant="unstyled"
                        onClick={goBack}
                        className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors group w-fit"
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back
                    </Button>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">Settings</h1>
                    <p className="text-slate-500 max-w-2xl">Manage your account preferences, notifications, and application appearance to customize your EpicCV experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Sidebar nội bộ Settings */}
                    <aside className="md:col-span-3 space-y-2">
                        <Button variant="unstyled" onClick={() => setActiveTab('account')} className={getTabClass('account')}>
                            <span className="material-symbols-outlined">person</span>
                            <span>Account</span>
                        </Button>
                        <Button variant="unstyled" onClick={() => setActiveTab('notifications')} className={getTabClass('notifications')}>
                            <span className="material-symbols-outlined">notifications</span>
                            <span>Notifications</span>
                        </Button>
                        <Button variant="unstyled" onClick={() => setActiveTab('appearance')} className={getTabClass('appearance')}>
                            <span className="material-symbols-outlined">palette</span>
                            <span>Appearance</span>
                        </Button>
                        <Button variant="unstyled" onClick={() => { setActiveTab('help'); setSupportDetail(null); }} className={getTabClass('help')}>
                            <span className="material-symbols-outlined">help</span>
                            <span>Support</span>
                        </Button>
                    </aside>

                    {/* Nội dung Settings */}
                    <div className="md:col-span-9 space-y-8">
                        {activeTab === 'account' && (
                            <>
                                <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <span className="material-symbols-outlined text-[var(--color-primary)]">manage_accounts</span>
                                        </div>
                                        <h2 className="text-xl font-bold tracking-tight text-slate-900">{isChangingPassword ? 'Change Password' : 'Account Settings'}</h2>
                                    </div>

                                    {!isChangingPassword ? (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">Full Name</label>
                                                    <Input type="text" defaultValue="Nguyen Van Viet" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">Email Address</label>
                                                    <Input type="email" defaultValue="viet.nguyen@epiccv.com" />
                                                </div>
                                            </div>
                                            <div className="pt-4 flex flex-wrap gap-4">
                                                <Button variant="soft">
                                                    Update Profile
                                                </Button>
                                                <Button variant="secondary" onClick={() => setIsChangingPassword(true)}>
                                                    Change Password
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">Current Password</label>
                                                    <Input type="password" placeholder="••••••••" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">New Password</label>
                                                        <Input type="password" placeholder="••••••••" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">Confirm New Password</label>
                                                        <Input type="password" placeholder="••••••••" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4 flex flex-wrap gap-4">
                                                <Button variant="primary">
                                                    Save Changes
                                                </Button>
                                                <Button variant="secondary" onClick={() => setIsChangingPassword(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                {/* Logout Section */}
                                <section className="bg-red-50 p-8 rounded-2xl border border-red-100">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div>
                                            <h2 className="text-xl font-bold tracking-tight text-red-600">Sign Out</h2>
                                            <p className="text-red-500/70 mt-1">Securely exit your account on this device.</p>
                                        </div>
                                        <Button
                                            variant="danger"
                                            onClick={() => setShowLogoutConfirm(true)}
                                            className="w-full md:w-auto px-10 py-4"
                                        >
                                            <span className="material-symbols-outlined">logout</span>
                                            Log Out
                                        </Button>
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 'notifications' && (
                            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <span className="material-symbols-outlined text-purple-600">notifications_active</span>
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">Notification Settings</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-slate-400">mail</span>
                                            <div>
                                                <p className="font-semibold text-slate-900">Email Notifications</p>
                                                <p className="text-sm text-slate-500">Receive weekly analysis and job alerts</p>
                                            </div>
                                        </div>
                                        {/* Tích hợp React-Switch */}
                                        <Switch
                                            checked={isEmailNotify}
                                            onChange={setIsEmailNotify}
                                            onColor="#0061a5"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={24}
                                            width={44}
                                            handleDiameter={20}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-slate-400">notifications_paused</span>
                                            <div>
                                                <p className="font-semibold text-slate-900">Push Notifications</p>
                                                <p className="text-sm text-slate-500">Get instant alerts on your devices</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={isPushNotify}
                                            onChange={setIsPushNotify}
                                            onColor="#0061a5"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={24}
                                            width={44}
                                            handleDiameter={20}
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === 'appearance' && (
                            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <span className="material-symbols-outlined text-indigo-600">dark_mode</span>
                                    </div>
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">Appearance</h2>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-slate-400">contrast</span>
                                        <div>
                                            <p className="font-semibold text-slate-900">Dark Mode</p>
                                            <p className="text-sm text-slate-500">Reduce eye strain in low-light environments</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={isDarkMode}
                                        onChange={setIsDarkMode}
                                        onColor="#0061a5"
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        height={24}
                                        width={44}
                                        handleDiameter={20}
                                    />
                                </div>
                            </section>
                        )}

                        {activeTab === 'help' && (
                            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
                                {!supportDetail ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-2 bg-slate-100 rounded-lg">
                                                <span className="material-symbols-outlined text-slate-600">support_agent</span>
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight text-slate-900">Help & Support</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Button variant="unstyled" onClick={() => setSupportDetail('faq')} className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:shadow-sm transition-all group">
                                                <span className="material-symbols-outlined text-3xl mb-3 text-[var(--color-primary)] group-hover:scale-110 transition-transform">quiz</span>
                                                <span className="font-semibold text-sm uppercase tracking-wider text-slate-700">FAQ</span>
                                            </Button>
                                            <Button variant="unstyled" onClick={() => setSupportDetail('contact')} className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:shadow-sm transition-all group">
                                                <span className="material-symbols-outlined text-3xl mb-3 text-blue-500 group-hover:scale-110 transition-transform">chat</span>
                                                <span className="font-semibold text-sm uppercase tracking-wider text-slate-700">Contact</span>
                                            </Button>
                                            <Button variant="unstyled" onClick={() => setSupportDetail('terms')} className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:shadow-sm transition-all group">
                                                <span className="material-symbols-outlined text-3xl mb-3 text-purple-500 group-hover:scale-110 transition-transform">gavel</span>
                                                <span className="font-semibold text-sm uppercase tracking-wider text-slate-700">Terms</span>
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setSupportDetail(null)}
                                                className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center text-slate-500"
                                            >
                                                <span className="material-symbols-outlined">arrow_back</span>
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined ${supportItems[supportDetail].color}`}>
                                                    {supportItems[supportDetail].icon}
                                                </span>
                                                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                                    {supportItems[supportDetail].title}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-xl min-h-[200px] flex items-center justify-center border border-dashed border-slate-200">
                                            <p className="text-slate-500 italic">
                                                Detailed information about {supportItems[supportDetail].title} is being updated...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Confirm Logout</h3>
                        <p className="text-slate-500 mb-6">Are you sure you want to log out of EpicCV?</p>
                        <div className="flex gap-3">
                            <Button variant="secondary" rounded="xl" onClick={() => setShowLogoutConfirm(false)} className="flex-1 font-semibold text-slate-700">Cancel</Button>
                            <Button variant="danger" rounded="xl" onClick={handleLogout} className="flex-1 font-semibold">Log Out</Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default SettingsView;