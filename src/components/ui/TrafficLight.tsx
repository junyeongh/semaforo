import clsx from "clsx";
import { useContext } from "react";
import { TimerContext } from "@/context/TimerContext";
import type { SemaforoState } from "@/types";

function TrafficLightIndicator({
  semaforoState: timerState,
}: // currentSemaforoState: currentState,
{
  semaforoState: SemaforoState;
  // currentSemaforoState: SemaforoState;
}) {
  // get currentSemaforoState from context later; currentSemaforoState={"focus"}
  const currentSemaforoState = "focus";
  const isMatchingState = timerState === currentSemaforoState;

  return (
    <div
      className={clsx("w-12 h-12 rounded-full border-4", {
        "border-green-500 bg-green-500": timerState === "focus" && isMatchingState,
        "border-green-500 bg-green-500/30": timerState === "focus" && !isMatchingState,
        "border-yellow-500 bg-yellow-500": timerState === "transition" && isMatchingState,
        "border-yellow-500 bg-yellow-500/30": timerState === "transition" && !isMatchingState,
        "border-red-500 bg-red-500": timerState === "break" && isMatchingState,
        "border-red-500 bg-red-500/30": timerState === "break" && !isMatchingState,
      })}
    ></div>
  );
}

export function TrafficLight() {
  return (
    <div className="flex space-x-4 mb-8">
      <TrafficLightIndicator semaforoState={"focus"} />
      <TrafficLightIndicator semaforoState={"transition"} />
      <TrafficLightIndicator semaforoState={"break"} />
    </div>
  );
}
