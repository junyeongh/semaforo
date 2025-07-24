import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export function Timer() {
  const { timeLeft } = useContext(TimerContext);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="text-6xl font-bold text-gray-800 mb-8">
      {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </div>
  );
}
