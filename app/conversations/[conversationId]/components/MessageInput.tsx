"use client"
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInput {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  placeholder: string;
  required?: boolean;
}
export const MessageInput: React.FC<IMessageInput> = ({
  id,
  type,
  register,
  errors,
  placeholder,
  required,
}) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id, { required })}
        autoComplete={id}
        className="text-black font-light py-2 px-4 bg-neutral-50 rounded-full focus:outline-none w-full"
      />
    </div>
  );
};
