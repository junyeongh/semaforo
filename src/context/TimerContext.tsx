import React, { createContext, type PropsWithChildren, useContext, useReducer, useState } from "react";
import type { SemaforoState, TimerState, TimerStateDuration } from "@/types";

interface SemaforoValues {
  currentSemaforoState: SemaforoState;
  currentTimerState: TimerState;
  timeLeft: number;
}

type SemaforoStateConfig = {
  stages: Record<SemaforoState, { duration: number }>;
};

const semaforo_config: SemaforoStateConfig = {
  stages: {
    focus: {
      duration: 40 * 60, // 40 minutes
    },
    transition: {
      duration: 10, // 10 seconds
    },
    break: {
      duration: 20 * 60, // 20 minutes
    },
  },
};

const initialSemaforoValues: SemaforoValues = {
  currentSemaforoState: "focus",
  currentTimerState: "initial",
  timeLeft: semaforo_config.stages.focus.duration,
};

type TimerAction =
  | { type: "update_current_state"; payload: TimerState }
  | { type: "set_running" }
  | { type: "set_pause" }
  | { type: "update_time_left"; payload: number };

type TimerStateDurationContextType = {
  stateDurations: TimerStateDuration;
  setStateDurations: React.Dispatch<React.SetStateAction<TimerStateDuration>>;
} | null;

export const TimerContext = createContext<SemaforoValues | null>(null);
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

function timerStateReducer(timerState: SemaforoValues, action: TimerAction) {
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
  const [timerState, dispatch] = useReducer(timerStateReducer, initialSemaforoValues);
  const [stateDurations, setStateDurations] = useState(defaultStateDurations);

  return (
    <TimerContext value={timerState}>
      <TimerDispatchContext value={dispatch}>
        <TimerStateDurationContext value={{ stateDurations, setStateDurations }}>{children}</TimerStateDurationContext>
      </TimerDispatchContext>
    </TimerContext>
  );
}
