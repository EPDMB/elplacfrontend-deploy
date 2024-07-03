"use client";
import { IInputProps, formTypeEnum } from "@/types";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input: React.FC<IInputProps> = ({
  label,
  userType,
  type,
  formType,
  value,
  ...inputProps
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <label
        className={
          formType === formTypeEnum.login
            ? `${
                userType ? "text-primary-dark" : "text-secondary-darker"
              } text-base font-medium`
            : "text-sm font-bold sm:text-base"
        }>
        {label}
      </label>
      <div className="relative w-fit">
        <input
          className={
            formType === formTypeEnum.login
              ? `border w-full ${
                  userType
                    ? "border-primary-default bg-primary-lighter"
                    : "border-secondary-default bg-secondary-lighter"
                } rounded-md pl-4 pr-12 py-2 focus:outline-none`
              : "bg-transparent border-b border-primary-dark mb-8 focus:outline-none"
          }
          type={passwordVisible ? "text" : type} // Mostrar texto en lugar de contraseña si es visible
          {...inputProps}
          value={value}
        />
        {type === "password" && (
          <button
            type="button"
            className={`absolute inset-y-0 ${
              formType === formTypeEnum.dashboard_user && "-translate-y-4"
            } right-0 flex items-center px-3 text-gray-500`}
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
