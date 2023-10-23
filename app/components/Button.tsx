"use client";
import clsx from "clsx";
import React from "react";

interface IButton {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
  fullWith?: boolean;
  children?: React.ReactNode;
  danger?: boolean;
  secoundry?: boolean;
}

const Button: React.FC<IButton> = ({
  type,
  disabled,
  onClick,
  fullWith,
  children,
  danger,
  secoundry,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(`
      flex
      justify-center
      rounded-md
      py-2
      px-3
      text-sm
      font-semibold
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2 
      `,
       disabled && "opacity-50 cursor-default",
       secoundry ? "text-gray-900" : "text-white",
       fullWith && 'w-full',
       danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
       !secoundry && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
