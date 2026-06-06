import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/userApi";
import type { ProfileData } from "../api/userApi";

export const useTopbar = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<ProfileData | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUserInfo(data);
      } catch {
        console.error("Unable to load topbar profile");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    setShowLogoutConfirm(false);
    setShowProfileMenu(false);
    navigate("/sign-in");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowProfileMenu(false);
  };

  return {
    showProfileMenu,
    showLogoutConfirm,
    setShowLogoutConfirm,
    isMobileMenuOpen,
    headerRef,
    userInfo,
    toggleProfileMenu,
    toggleMobileMenu,
    handleLogout,
    handleNavigate,
  };
};
