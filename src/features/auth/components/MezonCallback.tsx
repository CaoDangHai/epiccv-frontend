import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClient } from "../../../utils/apiClient";
import { Button } from "../../../components/ui/Button";

export const MezonCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const processMezonAuth = async () => {
      const code = searchParams.get("code");
      const returnedState = searchParams.get("state");
      const savedState = localStorage.getItem("mezon_oauth_state");

      if (!code || !returnedState || returnedState !== savedState) {
        setStatus("error");
        setErrorMessage(
          "Security check failed or the authentication session is invalid. Please try again."
        );
        localStorage.removeItem("mezon_oauth_state");
        return;
      }

      localStorage.removeItem("mezon_oauth_state");

      try {
        const response = await apiClient.post("/auth/mezon", { code, state: returnedState });

        localStorage.setItem("access_token", response.data.accessToken);
        if (response.data.user) {
          localStorage.setItem("user_info", JSON.stringify(response.data.user));
        }
        navigate("/home");
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        setStatus("error");
        setErrorMessage(err.response?.data?.message || "Unable to connect with Mezon.");
      }
    };

    processMezonAuth();
  }, [searchParams, navigate]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Connecting with Mezon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Sign-in failed</h3>
        <p className="text-slate-500 mb-6">{errorMessage}</p>
        <Button
          variant="unstyled"
          onClick={() => navigate("/sign-in")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};
