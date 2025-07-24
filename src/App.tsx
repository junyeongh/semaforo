import { Maximize2, Minus, Pause, Play, RotateCcw } from "lucide-react";

import Button from "./components/Buttons";
import { TrafficLight } from "./components/Indicator";
import { ProgressBar } from "./components/ProgressBar";
import { Timer } from "./components/Timer";

import { useTimerContext, useTimerDispatchContext, useTimerStateDurationContext } from "./context/TimerContext";

function App() {
  const { currentState, isRunning } = useTimerContext();
  const dispatch = useTimerDispatchContext();
  const { stateDurations } = useTimerStateDurationContext();

  const handleStart = () => {
    dispatch({
      type: "set_running",
    });
  };

  const handlePause = () => {
    dispatch({
      type: "set_pause",
    });
  };

  const handleReset = () => {
    dispatch({ type: "set_pause" });
    dispatch({ type: "update_current_state", payload: "focus" });
    dispatch({ type: "update_time_left", payload: stateDurations[currentState] });
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-96 h-96 relative overflow-hidden">
        {/* Window controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {!isRunning ? (
            <Button handleClick={handleStart}>
              <Play size={18} />
            </Button>
          ) : (
            <Button handleClick={handlePause}>
              <Pause size={18} />
            </Button>
          )}
          <Button handleClick={handleReset}>
            <RotateCcw size={18} />
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            handleClick={() => {
              console.log("Minimize");
            }}
          >
            <Minus size={18} />
          </Button>
          <Button
            handleClick={() => {
              console.log("Expand");
            }}
          >
            <Maximize2 size={18} />
          </Button>
        </div>

        {/* Timer display */}
        <div className="flex flex-col items-center justify-center h-full">
          <Timer />
          <TrafficLight />
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

export default App;
