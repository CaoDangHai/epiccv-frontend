import React, { useState } from "react";
import toast from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import Switch from "react-switch";
import { useSettings } from "./useSettings";
import type { SettingsTab } from "./useSettings";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { deleteAllHistory } from "../../api/cvApi";

interface ToastProps {
  t: Toast;
  onConfirm: () => void;
}

const DeleteConfirmToast: React.FC<ToastProps> = ({ t, onConfirm }) => {
  const [text, setText] = useState("");
  return (
    <div
      className={`${t.visible ? "animate-in zoom-in-95" : "animate-out zoom-out-95"} max-w-sm w-full bg-white shadow-2xl rounded-2xl p-6 border border-slate-100 flex flex-col pointer-events-auto`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-red-600">warning</span>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Delete data?</h3>
          <p className="text-xs text-slate-500">This action cannot be undone.</p>
        </div>
      </div>
      <p className="text-sm text-slate-700 mb-3">
        Type <strong>DELETE-DATA</strong> to confirm:
      </p>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="DELETE-DATA"
        className="mb-4 text-center font-bold tracking-widest text-red-600 uppercase"
      />
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => toast.dismiss(t.id)}
          className="flex-1 !py-2 text-sm"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={text !== "DELETE-DATA"}
          className="flex-1 !py-2 text-sm disabled:opacity-50"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const SettingsView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    goBack,
    personalInfo,
    setPersonalInfo,
    passwords,
    setPasswords,
    isSaving,
    isLoading,
    isChangingPass,
    handleSaveProfile,
    handleChangePassword,
    fileInputRef,
    handleAvatarClick,
    handleAvatarChange,
    isUploadingAvatar,
  } = useSettings();

  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(true);

  const triggerDangerZone = () => {
    toast.custom(
      (t) => (
        <DeleteConfirmToast
          t={t}
          onConfirm={async () => {
            toast.dismiss(t.id);
            const loadingId = toast.loading("Cleaning analysis data...");
            try {
              await deleteAllHistory();
              toast.success("Analysis history deleted permanently.", { id: loadingId });
            } catch {
              toast.error("Unable to delete analysis data", { id: loadingId });
            }
          }}
        />
      ),
      { duration: Infinity }
    );
  };

  const getTabClass = (tabName: SettingsTab) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left font-medium ${tabName === activeTab ? "bg-blue-50 text-[var(--color-primary)] font-bold" : "text-slate-600 hover:bg-slate-100"}`;

  return (
    <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-slate-50 text-slate-900">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/jpeg, image/png, image/jpg, image/webp"
        className="hidden"
      />

      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="mb-2">
          <Button
            variant="unstyled"
            onClick={goBack}
            className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[var(--color-primary)] transition-colors group w-fit"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back
          </Button>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Account & Settings</h1>
          <p className="text-slate-500 text-sm">
            Manage your account information, privacy preferences, and system settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <aside className="md:col-span-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <button onClick={() => setActiveTab("profile")} className={getTabClass("profile")}>
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              Personal Information
            </button>
            <button onClick={() => setActiveTab("privacy")} className={getTabClass("privacy")}>
              <span className="material-symbols-outlined text-[20px]">security</span>
              Privacy
            </button>
            <button onClick={() => setActiveTab("terms")} className={getTabClass("terms")}>
              <span className="material-symbols-outlined text-[20px]">gavel</span>
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab("danger")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left font-medium ${activeTab === "danger" ? "bg-red-50 text-red-600 font-bold" : "text-slate-600 hover:bg-red-50 hover:text-red-600"}`}
            >
              <span className="material-symbols-outlined text-[20px]">delete_forever</span>
              Danger Zone
            </button>
          </aside>

          <div className="md:col-span-8">
            {isLoading ? (
              <div className="text-center text-slate-400 py-12 font-medium animate-pulse">
                Loading account information...
              </div>
            ) : (
              <div className="space-y-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                      <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
                        <div
                          className={`relative w-20 h-20 rounded-full border-2 border-slate-200 overflow-hidden cursor-pointer group bg-slate-100 shrink-0 ${isUploadingAvatar ? "opacity-50 pointer-events-none" : ""}`}
                          onClick={handleAvatarClick}
                        >
                          <img
                            src={personalInfo.avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover transition-opacity group-hover:opacity-60"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            {isUploadingAvatar ? (
                              <span className="material-symbols-outlined text-white animate-spin">
                                progress_activity
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-white text-[24px]">
                                photo_camera
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900">Update Profile</h3>
                          <p className="text-sm text-slate-500 mt-1">{personalInfo.email}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                              Full Name
                            </label>
                            <Input
                              value={personalInfo.name}
                              onChange={(e) =>
                                setPersonalInfo({ ...personalInfo, name: e.target.value })
                              }
                              placeholder="Full name"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                              Phone
                            </label>
                            <Input
                              value={personalInfo.phone}
                              onChange={(e) =>
                                setPersonalInfo({ ...personalInfo, phone: e.target.value })
                              }
                              placeholder="Contact phone"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                            Location
                          </label>
                          <Input
                            value={personalInfo.location}
                            onChange={(e) =>
                              setPersonalInfo({ ...personalInfo, location: e.target.value })
                            }
                            placeholder="Example: Ho Chi Minh City"
                          />
                        </div>
                        <div className="pt-2 flex justify-end">
                          <Button onClick={handleSaveProfile} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </section>

                    {personalInfo.provider === "local" && (
                      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Keep your account protected with a strong password.
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                            Current Password
                          </label>
                          <Input
                            type="password"
                            value={passwords.oldPassword}
                            onChange={(e) =>
                              setPasswords({ ...passwords, oldPassword: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                              New Password
                            </label>
                            <Input
                              type="password"
                              value={passwords.newPassword}
                              onChange={(e) =>
                                setPasswords({ ...passwords, newPassword: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                              Confirm New Password
                            </label>
                            <Input
                              type="password"
                              value={passwords.confirmPassword}
                              onChange={(e) =>
                                setPasswords({ ...passwords, confirmPassword: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="pt-2 flex justify-end">
                          <Button
                            variant="secondary"
                            onClick={handleChangePassword}
                            disabled={
                              isChangingPass || !passwords.oldPassword || !passwords.newPassword
                            }
                          >
                            {isChangingPass ? "Processing..." : "Update Password"}
                          </Button>
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {activeTab === "privacy" && (
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <span className="material-symbols-outlined text-[var(--color-primary)]">
                          psychology
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">AI Improvement</h2>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="max-w-[80%]">
                        <p className="font-semibold text-slate-900 text-sm">
                          Share anonymized training samples
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          Allow EpicCV to use anonymized data to improve model quality.
                        </p>
                      </div>
                      <Switch
                        checked={isPrivacyAgreed}
                        onChange={setIsPrivacyAgreed}
                        onColor="#0d99ff"
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </div>
                  </section>
                )}

                {activeTab === "terms" && (
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <span className="material-symbols-outlined text-slate-700">gavel</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Terms of Service</h2>
                    </div>
                    <div className="prose prose-sm text-slate-600 max-h-96 overflow-y-auto pr-4 space-y-4">
                      <p>
                        <strong>1. Acceptance:</strong> By using EpicCV, you agree that the service
                        may process career-related information to provide analysis and guidance.
                      </p>
                      <p>
                        <strong>2. Data Protection:</strong> Uploaded CV files are used only for
                        your account workflows. EpicCV does not sell personal data to third parties.
                      </p>
                      <p>
                        <strong>3. Disclaimer:</strong> AI-generated analysis and roadmaps are
                        guidance only. EpicCV cannot guarantee hiring outcomes.
                      </p>
                      <p>
                        <strong>4. Deletion Rights:</strong> You can remove analysis history and
                        roadmap data from the Danger Zone.
                      </p>
                    </div>
                  </section>
                )}

                {activeTab === "danger" && (
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 bg-gradient-to-br from-white to-red-50/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <span className="material-symbols-outlined text-red-600">error</span>
                      </div>
                      <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">Delete analysis history</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          Permanently delete all CV analysis reports and roadmap data.
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        onClick={triggerDangerZone}
                        className="w-full md:w-auto px-6 py-2.5 whitespace-nowrap text-sm"
                      >
                        Delete Data
                      </Button>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsView;
