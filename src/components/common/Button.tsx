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
  const baseStyles = "font-medium transition-colors rounded-xl py-3 px-4";
  const variantStyles = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 ",
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
