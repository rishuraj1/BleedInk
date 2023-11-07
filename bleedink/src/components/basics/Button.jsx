import React from "react";

const Button = ({
  children,
  onClick = () => {},
  className,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onclick}
      className={`${className} ${disabled ? "opacity-50" : ""} `}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
