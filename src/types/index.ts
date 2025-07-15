export type TimerState = 'focus' | 'transition' | 'break'

export interface TimerStateDuration {
  focus: number
  transition: number
  break: number
}
