import React, { FC } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const TextField: FC<TextFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center ml-4 text-sm font-medium text-gray-700 mb-1">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className=" border w-full px-4 py-3.5 rounded-full  border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent   outline-none  transition-colors"
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
};

export default TextField;
