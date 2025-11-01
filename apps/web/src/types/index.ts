export type TimerState = "initial" | "running" | "paused"; // initial_state: initial
export type SemaforoState = "focus" | "transition" | "break"; // initial_state: focus

type Transition<T extends TimerState | SemaforoState> = {
  from?: T;
  to: T;
};

interface StateMachine<T extends TimerState | SemaforoState> {
  initial_state: T;
  transitions: Record<string, Transition<T>>;
}

export const timer_state_machine: StateMachine<TimerState> = {
  initial_state: "initial",
  transitions: {
    start: { from: "initial", to: "running" },
    pause: { from: "running", to: "paused" },
    resume: { from: "paused", to: "running" },
    reset: { to: "initial" }, // either "running" or "paused" to "initial" is reset.
  },
};

export const semaforo_state_machine: StateMachine<SemaforoState> = {
  initial_state: "focus",
  transitions: {
    start_break: { from: "transition", to: "break" },
    start_focus: { from: "transition", to: "focus" },
    end_break: { from: "break", to: "transition" },
    end_focus: { from: "focus", to: "transition" },
  },
};

export interface TimerStateDuration {
  focus: number;
  transition: number;
  break: number;
}
