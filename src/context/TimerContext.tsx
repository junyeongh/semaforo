import React, { createContext, type PropsWithChildren, useContext, useReducer, useState } from "react";
import type { TimerState, TimerStateDuration } from "../types";

interface TimerStateType {
  currentState: TimerState;
  isRunning: boolean;
  timeLeft: number;
}

type TimerAction =
  | { type: "update_current_state"; payload: TimerState }
  | { type: "set_running" }
  | { type: "set_pause" }
  | { type: "update_time_left"; payload: number };

type TimerStateDurationContextType = {
  stateDurations: TimerStateDuration;
  setStateDurations: React.Dispatch<React.SetStateAction<TimerStateDuration>>;
} | null;

const defaultStateDurations: TimerStateDuration = {
  focus: 40 * 60, // 40 minutes
  transition: 10, // 10 seconds
  break: 20 * 60, // 20 minutes
};

const initialTimerState: TimerStateType = {
  currentState: "focus",
  isRunning: false,
  timeLeft: defaultStateDurations.focus,
};

export const TimerContext = createContext<TimerStateType | null>(null);
export const TimerDispatchContext = createContext<React.Dispatch<TimerAction> | null>(null);
export const TimerStateDurationContext = createContext<TimerStateDurationContextType>(null);

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimeContextProvider");
  }
  return context;
}
export function useTimerDispatchContext() {
  const context = useContext(TimerDispatchContext);
  if (!context) {
    throw new Error("useTimerDispatchContext must be used within a TimeContextProvider");
  }
  return context;
}
export function useTimerStateDurationContext() {
  const context = useContext(TimerStateDurationContext);
  if (!context) {
    throw new Error("useTimerStateDurationContext must be used within a TimeContextProvider");
  }
  return context;
}

function timerStateReducer(timerState: TimerStateType, action: TimerAction) {
  switch (action.type) {
    case "update_current_state": {
      return {
        ...timerState,
        currentState: action.payload,
      };
    }
    case "set_running": {
      return {
        ...timerState,
        isRunning: true,
      };
    }
    case "set_pause": {
      return {
        ...timerState,
        isRunning: false,
      };
    }
    case "update_time_left": {
      return {
        ...timerState,
        timeLeft: action.payload,
      };
    }
    default: {
      throw Error("Unknown action type");
    }
  }
}

export function TimerContextProvider({ children }: PropsWithChildren) {
  const [timerState, dispatch] = useReducer(timerStateReducer, initialTimerState);
  const [stateDurations, setStateDurations] = useState(defaultStateDurations);

  return (
    <TimerContext value={timerState}>
      <TimerDispatchContext value={dispatch}>
        <TimerStateDurationContext value={{ stateDurations, setStateDurations }}>{children}</TimerStateDurationContext>
      </TimerDispatchContext>
    </TimerContext>
  );
}
