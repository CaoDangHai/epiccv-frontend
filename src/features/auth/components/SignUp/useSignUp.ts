import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiClient } from "../../../../utils/apiClient";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
    // Xóa 'any'
    if (!turnstileToken) {
      toast.error("Vui lòng xác thực bạn không phải là robot!");
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
      toast.success(response.data?.message || "Đăng ký thành công! Đang chuyển hướng...");

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error: unknown) {
      // Xóa 'any'
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err.response?.data?.message;

      if (errorMessage === "EMAIL_ALREADY_EXISTS") {
        toast.error("Email này đã được sử dụng. Vui lòng đăng nhập!", { duration: 4000 });
        setTimeout(() => navigate("/sign-in"), 1500);
      } else {
        toast.error(errorMessage || "Đăng ký thất bại. Vui lòng thử lại!");
      }
      setTurnstileToken("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMezonSignUp = () => {
    const clientId = import.meta.env.VITE_MEZON_CLIENT_ID || "";
    const redirectUri = import.meta.env.VITE_MEZON_REDIRECT_URI || "";
    const state = Math.random().toString(36).substring(2, 13);

    localStorage.setItem("mezon_oauth_state", state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid offline",
      state: state,
    });

    window.location.href = `https://oauth2.mezon.ai/oauth2/auth?${params.toString()}`;
  };

  const goToSignIn = () => navigate("/sign-in");

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    watch,
    handleMezonSignUp,
    goToSignIn,
    setTurnstileToken,
    isLoading,
  };
};
