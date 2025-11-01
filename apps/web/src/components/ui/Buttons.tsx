import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
      // onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
