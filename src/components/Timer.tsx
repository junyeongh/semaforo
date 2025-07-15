import type { PropsWithChildren } from "react";

export function Timer({ children }: PropsWithChildren) {
  return (
    <div className="text-6xl font-bold text-gray-800 mb-8">
      {children}
    </div>
  )
}