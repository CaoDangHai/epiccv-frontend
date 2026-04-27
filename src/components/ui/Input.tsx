import React, { forwardRef, useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, error, ...props }, ref) => {
    // State quản lý ẩn/hiện mật khẩu (Chỉ dùng khi type là password)
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";

    // Nếu đang hiện mật khẩu thì đổi type thành text
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full relative">
        <input
          ref={ref}
          type={inputType}
          // Nếu là password thì tự động thêm pr-12 để chữ không chui vào trong con mắt
          className={`w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isPasswordType ? "pr-12" : ""} ${className}`}
          {...props}
        />

        {/* Nút con mắt chỉ hiện khi Input này được khai báo là type="password" */}
        {isPasswordType && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-blue-600 focus:outline-none transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        )}

        {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
