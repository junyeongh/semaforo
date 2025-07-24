import clsx from "clsx";
import { useTimerContext, useTimerStateDurationContext } from "../context/TimerContext";

export function ProgressBar() {
  const { currentState, timeLeft } = useTimerContext();
  const { stateDurations } = useTimerStateDurationContext();

  const total: number = stateDurations[currentState];
  const currentProgress: number = (timeLeft / total) * 100;

  return (
    <div className="w-72 h-6 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={clsx("h-full transition-all duration-300", {
          "bg-green-500": currentState === "focus",
          // "bg-yellow-500": currentState === "transition",
          "bg-red-500": currentState === "break",
        })}
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
}
