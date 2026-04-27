import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "soft" | "ghost" | "unstyled";
  rounded?: "full" | "xl" | "lg" | "md" | "none";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  rounded = "full",
  ...props
}) => {
  let baseClass = "";

  // Nếu không phải là dạng unstyled (loại bỏ hoàn toàn CSS mặc định), ta sẽ gắn các base style
  if (variant !== "unstyled") {
    baseClass +=
      "inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-95 px-6 py-3 ";

    switch (rounded) {
      case "full":
        baseClass += "rounded-full ";
        break;
      case "xl":
        baseClass += "rounded-xl ";
        break;
      case "lg":
        baseClass += "rounded-lg ";
        break;
      case "md":
        baseClass += "rounded-md ";
        break;
      case "none":
        baseClass += "rounded-none ";
        break;
    }
  }

  // Gắn style theo từng Variant (kiểu nút)
  switch (variant) {
    case "primary":
      baseClass += "bg-[var(--color-primary)] text-white hover:shadow-lg hover:brightness-110 ";
      break;
    case "secondary":
      baseClass += "bg-slate-100 text-slate-700 hover:bg-slate-200 ";
      break;
    case "soft":
      baseClass += "bg-blue-50 text-[var(--color-primary)] hover:bg-blue-100 ";
      break;
    case "danger":
      baseClass += "bg-red-600 text-white shadow-md hover:bg-red-700 ";
      break;
    case "ghost":
      baseClass += "bg-transparent hover:opacity-80 px-0 py-0 ";
      break;
    case "unstyled":
      baseClass = "";
      break;
  }

  return (
    // SỬA LỖI TẠI ĐÂY: Dùng thẻ <button> viết thường của HTML
    <button className={`${baseClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};
