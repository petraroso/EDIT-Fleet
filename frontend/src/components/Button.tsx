import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
