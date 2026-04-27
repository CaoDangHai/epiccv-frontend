import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient } from "../../../../utils/apiClient";

const generateMezonState = (length: number = 11): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const useSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: Record<string, string | boolean>) => {
    // Xóa 'any'
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("access_token", response.data.accessToken);
      if (response.data.user) {
        localStorage.setItem("user_info", JSON.stringify(response.data.user));
      }

      toast.success("Đăng nhập thành công!");
      navigate("/home");
    } catch (error: unknown) {
      // Xóa 'any'
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Sai email hoặc mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMezonSignIn = () => {
    const clientId = import.meta.env.VITE_MEZON_CLIENT_ID || "";
    const redirectUri = import.meta.env.VITE_MEZON_REDIRECT_URI || "";
    const state = generateMezonState(11);

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

  const goToSignUp = () => navigate("/sign-up");

  return { register, errors, handleSubmit, onSubmit, handleMezonSignIn, goToSignUp, isLoading };
};
