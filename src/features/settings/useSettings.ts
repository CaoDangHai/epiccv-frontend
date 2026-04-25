import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SettingsTab, SupportDetailType, SupportItem } from './types';

export const useSettings = () => {
    const navigate = useNavigate();

    // States
    const [activeTab, setActiveTab] = useState<SettingsTab>('account');
    const [isEmailNotify, setIsEmailNotify] = useState(true);
    const [isPushNotify, setIsPushNotify] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [supportDetail, setSupportDetail] = useState<SupportDetailType>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Xử lý Dark Mode với localStorage
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Data tĩnh
    const supportItems: Record<string, SupportItem> = {
        faq: { title: "Frequently Asked Questions", icon: "quiz", color: "text-[var(--color-primary)]" },
        contact: { title: "Contact Support", icon: "chat", color: "text-blue-500" },
        terms: { title: "Terms of Service", icon: "gavel", color: "text-purple-500" }
    };

    // Hành động
    const goBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        // Thực hiện logic xóa token, v.v ở đây
        setShowLogoutConfirm(false);
        navigate('/sign-in');
    };

    return {
        activeTab, setActiveTab,
        isEmailNotify, setIsEmailNotify,
        isPushNotify, setIsPushNotify,
        isDarkMode, setIsDarkMode,
        isChangingPassword, setIsChangingPassword,
        supportDetail, setSupportDetail,
        showLogoutConfirm, setShowLogoutConfirm,
        supportItems,
        goBack, handleLogout
    };
};