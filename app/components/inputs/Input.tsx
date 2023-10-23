"use client";
import React, { FC } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface InputProps {
  lable: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
}
const Input: FC<InputProps> = ({
  lable,
  id,
  register,
  type,
  required,
  errors,
  disabled,
}) => {
  return (
    <div className="my-3">
      <label
        className="
            text-sm
            block,
            font-medium
            leading-6
            text-gray-900
            "
        htmlFor={id}
      >
        {lable}
      </label>
      <div className="mt-2">
        <input
          type={type}
          autoComplete={id}
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
             form-input
             block
               w-full
              
              border-0
              rounded-md
              py-1.5
              text-gray-900
              shadow-sm
              ring-1
              ring-inset
              ring-gray-300
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-inset
              focus:ring-sky-600`,
              errors[id] && "focus:ring-rose-500",
              disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
