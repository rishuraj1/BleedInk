import React from "react";

const Button = ({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={`${className} ${
        disabled ? "opacity-50" : ""
      } bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded ease-in-out transition-all duration-300`}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
