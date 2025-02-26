import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-black cursor-pointer text-white font-bold py-2 px-4 rounded",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
