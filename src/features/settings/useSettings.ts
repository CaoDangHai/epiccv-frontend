import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfile, updateProfile, changePassword, uploadAvatarAPI } from "../../api/userApi";

export type SettingsTab = "profile" | "privacy" | "terms" | "danger";

export const useSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatarUrl: "",
    provider: "local",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const profile = await getProfile();
        setPersonalInfo({
          name: profile.fullName || "",
          email: profile.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
          avatarUrl: profile.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
          provider: profile.provider || "local",
        });
      } catch {
        toast.error("Không thể tải thông tin tài khoản");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        fullName: personalInfo.name,
        phone: personalInfo.phone,
        location: personalInfo.location,
      });
      toast.success("Đã cập nhật thông tin tài khoản!");
    } catch {
      toast.error("Cập nhật thông tin thất bại");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Mật khẩu xác nhận không khớp!");
    }
    setIsChangingPass(true);
    try {
      await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Đổi mật khẩu thành công!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Chỉ hỗ trợ file ảnh (JPG, PNG, WEBP)");
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Kích thước ảnh tối đa 2MB");
    }

    setIsUploadingAvatar(true);
    const toastId = toast.loading("Đang tải ảnh lên...");
    try {
      const { avatarUrl } = await uploadAvatarAPI(file);
      setPersonalInfo((prev) => ({ ...prev, avatarUrl }));
      toast.success("Cập nhật ảnh đại diện thành công", { id: toastId });
    } catch {
      toast.error("Không thể tải ảnh lên", { id: toastId });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const goBack = () => navigate(-1);

  return {
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
  };
};
