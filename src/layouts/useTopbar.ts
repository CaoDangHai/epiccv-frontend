import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useTopbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    // Xử lý click outside để đóng menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        setShowProfileMenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        setShowNotifications(false);
    };

    const handleLogout = () => {
        toast.success('Đã đăng xuất thành công!');
        setShowLogoutConfirm(false);
        navigate('/sign-in');
    };

    return {
        showNotifications,
        showProfileMenu,
        showLogoutConfirm,
        setShowLogoutConfirm,
        headerRef,
        toggleNotifications,
        toggleProfileMenu,
        handleLogout
    };
};