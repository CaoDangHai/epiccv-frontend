import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiClient } from "../../../../utils/apiClient";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // <-- TẠO REF ĐỂ ĐIỀU KHIỂN WIDGET TURNSTILE
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });

  const onSubmit = async (data: Record<string, string | boolean>) => {
    if (!turnstileToken) {
      toast.error("Vui lòng xác minh bạn không phải là robot.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        turnstileToken,
      };

      const response = await apiClient.post("/auth/register", payload);
      toast.success(response.data?.message || "Tạo tài khoản thành công. Đang chuyển hướng...");

      window.setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const errorMessage = err.response?.data?.message;

      if (errorMessage === "EMAIL_ALREADY_EXISTS") {
        toast.error("Email này đã được sử dụng. Vui lòng đăng nhập.", { duration: 4000 });
        window.setTimeout(() => navigate("/sign-in"), 1500);
      } else if (Array.isArray(errorMessage)) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(errorMessage || "Đăng ký thất bại. Vui lòng thử lại.");
      }

      setTurnstileToken("");
      turnstileRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMezonSignUp = async () => {
    const clientId = import.meta.env.VITE_MEZON_CLIENT_ID || "";
    const redirectUri = import.meta.env.VITE_MEZON_REDIRECT_URI || "";

    try {
      const response = await apiClient.get("/auth/mezon/state");
      const state = response.data.state;

      localStorage.setItem("mezon_oauth_state", state);

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid offline",
        state,
      });

      window.location.href = `https://oauth2.mezon.ai/oauth2/auth?${params.toString()}`;
    } catch (error) {
      console.error("Lỗi Mezon Sign Up:", error);
      toast.error("Không thể khởi tạo phiên đăng ký an toàn với Mezon.");
    }
  };

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleMezonSignUp,
    goToSignIn,
    watch,
    setTurnstileToken,
    isLoading,
    turnstileRef,
  };
};
