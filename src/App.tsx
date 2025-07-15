import { useState, useEffect, useRef } from 'react'
import { Maximize2, Minus, Play, Pause, RotateCcw } from 'lucide-react'
import Button from './components/Buttons'
import { formatTime } from './utils'
import { TrafficLight } from './components/Indicator'
import type { TimerState, TimerStateDuration } from './types'
import { ProgressBar } from './components/ProgressBar'
import { Timer } from './components/Timer'

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentState, setCurrentState] = useState<TimerState>('focus')

  const [timeLeft, setTimeLeft] = useState(40 * 60)
  const [stateDurations, setStateDurations] = useState<TimerStateDuration>({
    focus: 40,
    transition: 10,
    break: 20
  })
  // setting
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const intervalRef = useRef<any>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const getInitialTime = (state: TimerState) => {
    switch (state) {
      case 'focus':
        return stateDurations.focus * 60
      case 'transition':
        return stateDurations.transition
      case 'break':
        return stateDurations.break * 60
      default:
        return 0
    }
  }

  const getProgress = () => {
    const total = getInitialTime(currentState)
    return (timeLeft / total) * 100
  }

  const nextState = () => {
    if (currentState === 'focus') {
      setCurrentState('transition')
      setTimeLeft(stateDurations.transition)
    } else if (currentState === 'transition') {
      setCurrentState('break')
      setTimeLeft(stateDurations.break * 60)
    } else {
      setCurrentState('focus')
      setTimeLeft(stateDurations.focus * 60)
    }
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentState('focus')
    setTimeLeft(stateDurations.focus * 60)
  }

  const handleDragStart = (clientY: number) => {
    setIsDragging(true)
    setDragStartY(clientY)
    setDragOffset(0)
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return

    const deltaY = clientY - dragStartY
    const newOffset = Math.max(0, deltaY)
    setDragOffset(newOffset)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    const panel = panelRef.current
    if (!panel) return

    const panelHeight = panel.offsetHeight
    const distanceThreshold = 50
    const percentageThreshold = panelHeight * 0.3

    const shouldClose = dragOffset > Math.min(distanceThreshold, percentageThreshold)

    setIsDragging(false)

    if (shouldClose) {
      setTimeout(() => {
        setSettingsOpen(false)
        setDragOffset(0)
      }, 100)
    } else {
      setDragOffset(0)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    handleDragStart(e.touches[0].clientY)
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            nextState()
            return getInitialTime(currentState === 'focus' ? 'transition' : currentState === 'transition' ? 'break' : 'focus')
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, currentState])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY)
    }

    const handleMouseUp = () => {
      handleDragEnd()
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleDragMove(e.touches[0].clientY)
    }

    const handleTouchEnd = () => {
      handleDragEnd()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragStartY, dragOffset])

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-96 h-96 relative overflow-hidden">
        {/* Window controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {!isRunning ?
            <Button handleClick={handleStart}>
              <Play size={18} />
            </Button>
            :
            <Button handleClick={handlePause} >
              <Pause size={18} />
            </Button>
          }
          <Button handleClick={handleReset} >
            <RotateCcw size={18} />
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <Button handleClick={() => { console.log("Minimize") }} >
            <Minus size={18} />
          </Button>
          <Button handleClick={() => { console.log("Expand") }} >
            <Maximize2 size={18} />
          </Button>
        </div>

        {/* Timer display */}
        <div className="flex flex-col items-center justify-center h-full">
          <Timer>
            {formatTime(timeLeft)}
          </Timer>
          {/* Traffic light indicators */}
          <TrafficLight currentState={currentState} />
          {/* Progress bar */}
          <ProgressBar currentState={currentState} currentProgress={getProgress()} />
        </div>

        {/* Settings toggle */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>

        {/* Settings panel */}
        <div
          ref={panelRef}
          className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 transform ${isDragging ? '' : 'transition-transform duration-300 ease-out'} ${settingsOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{
            transform: settingsOpen
              ? `translateY(${dragOffset}px)`
              : 'translateY(100%)',
            opacity: isDragging ? Math.max(0.7, 1 - dragOffset / 200) : 1
          }}
        >
          <div className="p-6 space-y-4">
            <div
              className="flex items-center justify-between cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Timer Settings</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Focus (minutes)</label>
                <input
                  type="number"
                  value={stateDurations.focus}
                  onChange={(e: any) => setStateDurations({ ...stateDurations, focus: parseInt(e.target.value) || 40 })}
                  className="w-20 p-1 border border-gray-300 rounded text-center"
                  min="1"
                  max="120"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Transition (seconds)</label>
                <input
                  type="number"
                  value={stateDurations.transition}
                  onChange={(e: any) => setStateDurations({ ...stateDurations, transition: parseInt(e.target.value) || 10 })}
                  className="w-20 p-1 border border-gray-300 rounded text-center"
                  min="1"
                  max="300"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Break (minutes)</label>
                <input
                  type="number"
                  value={stateDurations.break}
                  onChange={(e: any) => setStateDurations({ ...stateDurations, break: parseInt(e.target.value) || 20 })}
                  className="w-20 p-1 border border-gray-300 rounded text-center"
                  min="1"
                  max="60"
                />
              </div>
            </div>

            <button
              onClick={() => {
                handleReset()
                setSettingsOpen(false)
              }}
              className="w-full mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
