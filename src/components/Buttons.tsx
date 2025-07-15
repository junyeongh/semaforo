import type React from "react";

export default function Button({ children, handleClick }: React.PropsWithChildren<{ handleClick: () => void }>) {
  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors"
    >
      {children}
    </button>
  )
}