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
  touched,
  errors,
  edit,
  ...inputProps
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex">
      <div className="flex items-start flex-col">
        <div className="flex gap-2">

        <label
          className={
            formType === formTypeEnum.login
              ? `${
                  userType ? "text-primary-dark" : "text-secondary-darker"
                } text-base font-medium`
              : "text-xs font-bold sm:text-base mt-3"
          }
        >
          {label}
        </label>
        {errors && touched && (
          <div className="group relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75c-1.856 0-3.605-.471-5.13-1.3l-4.233.787a.75.75 0 0 1-.874-.874l.788-4.233A10.7 10.7 0 0 1 1.25 12M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75m.567 9.251a.75.75 0 1 0-1.114-1.004l-.01.011a.75.75 0 1 0 1.114 1.004z"
                clipRule="evenodd"
              />
            </svg>

            <div className="opacity-0 group-hover:opacity-100 absolute -translate-y-[120%]">
              {touched && errors || touched && errors && edit && (
                <p className="text-red-600 font-medium text-center text-sm">
                  {errors}
                </p>
              )}
            </div>
          </div>
        )}
        </div>
        <div className="relative w-fit ">
          <input
            className={
              formType === formTypeEnum.login
                ? `border w-full ${
                    userType
                      ? "border-primary-default bg-primary-lighter"
                      : "border-secondary-default bg-secondary-lighter"
                  } rounded-md pl-4 pr-12 py-2 focus:outline-none`
                : "bg-transparent border-b border-primary-dark focus:outline-none text-xs sm:text-base"
            }
            type={passwordVisible ? "text" : type}
            {...inputProps}
            value={value}
          />
          {type === "password" && (
            <button
              type="button"
              className={`absolute inset-y-0 ${
                formType === formTypeEnum.dashboard_user && "-translate-y-4"
              } right-0 flex items-center px-3 text-gray-500`}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
