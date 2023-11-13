import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, placeholder, type = "text", className = "", icon, ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full relative">
      {" "}
      {/* Added relative class to parent */}
      {icon && (
        <div
          className={`${
            type === "file" ? "relative top-[60px]" : "absolute top-[30px]"
          } inset-y-0 left-0 pl-1 text-center flex items-center pointer-events-none`}
        >
          {icon}
        </div>
      )}
      {label && (
        <label htmlFor={id} className="block text-md font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${
          icon ? "pl-8" : "pl-2"
        } mt-1 focus:ring-indigo-500 focus:border-indigo-500 block ${
          type === "file" ? "" : "w-full"
        } shadow-sm sm:text-sm border-gray-300 rounded-sm p-2 ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
