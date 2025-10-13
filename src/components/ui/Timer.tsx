import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

interface TimerProps {
  children: React.ReactNode;
}

export function Timer({ children }: TimerProps) {
  // const { timeLeft } = useContext(TimerContext);
  const minutes = 25; // Math.floor(timeLeft / 60);
  const seconds = 0; // timeLeft % 60;
  return (
    <div className="text-6xl font-bold text-gray-800 mb-8">
      {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      {children}
    </div>
  );
}
