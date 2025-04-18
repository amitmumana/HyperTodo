import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  icon?: ReactNode;
  loading: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  icon,
  className = "",
  loading = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full py-3.5 px-6 rounded-full font-medium text-center transition-colors";
  const variantStyles = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 ",
    secondary:
      "border border-gray-200 text-gray-600 hover:bg-gray-50 dark:text-white",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center">
        {icon}
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin" />
        </span>
      )}
    </button>
  );
}
