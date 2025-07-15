import clsx from "clsx"
import type { TimerState } from "../types";

function TrafficLightIndicator({ timerState, currentState }: { timerState: TimerState, currentState: TimerState }) {
  const isMatchingState = timerState === currentState;

  return (
    <div className={clsx(
      "w-12 h-12 rounded-full border-4",
      {
        "border-green-500 bg-green-500": timerState === "focus" && isMatchingState,
        "border-green-500 bg-green-500/30": timerState === "focus" && !isMatchingState,
        "border-yellow-500 bg-yellow-500": timerState === "transition" && isMatchingState,
        "border-yellow-500 bg-yellow-500/30": timerState === "transition" && !isMatchingState,
        "border-red-500 bg-red-500": timerState === "break" && isMatchingState,
        "border-red-500 bg-red-500/30": timerState === "break" && !isMatchingState,
      }
    )}></div>
  )
}

export function TrafficLight({ currentState }: { currentState: TimerState }) {
  return (
    <div className="flex space-x-4 mb-8">
      <TrafficLightIndicator timerState={"focus"} currentState={currentState} />
      <TrafficLightIndicator timerState={"transition"} currentState={currentState} />
      <TrafficLightIndicator timerState={"break"} currentState={currentState} />
    </div>
  )
}