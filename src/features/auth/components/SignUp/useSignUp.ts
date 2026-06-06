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
    if (!turnstileToken) {
      toast.error("Please verify that you are not a robot.");
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
      toast.success(response.data?.message || "Account created successfully. Redirecting...");

      window.setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err.response?.data?.message;

      if (errorMessage === "EMAIL_ALREADY_EXISTS") {
        toast.error("This email is already in use. Please sign in.", { duration: 4000 });
        window.setTimeout(() => navigate("/sign-in"), 1500);
      } else {
        toast.error(errorMessage || "Registration failed. Please try again.");
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
      state,
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
