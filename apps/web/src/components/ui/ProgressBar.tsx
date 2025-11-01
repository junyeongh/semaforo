import clsx from "clsx";
import type { SemaforoState } from "@/types";
import { useTimerContext, useTimerStateDurationContext } from "../../context/TimerContext";

const currentSemaforoState: SemaforoState = "focus";

export function ProgressBar() {
  // const { currentState, timeLeft } = useTimerContext();
  // const { stateDurations } = useTimerStateDurationContext();
  // const total: number = stateDurations[currentSemaforoState];
  // const currentProgress = (timeLeft / total) * 100;
  const currentProgress = 1 * 100;

  return (
    <div className="w-72 h-6 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={clsx("h-full transition-all duration-300", {
          "bg-green-500": currentSemaforoState === "focus",
          "bg-yellow-500": currentSemaforoState === "transition",
          "bg-red-500": currentSemaforoState === "break",
        })}
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
}
