import { useEffect, useRef, useState } from "react";
import TimerControls from "./TimerControls";

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function FocusTimer({ minutes, label }) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const isFinished = secondsLeft === 0;

  useEffect(() => {
    if (!isRunning || isFinished) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isFinished]);

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  }

  let status = "Paused";
  if (isFinished) status = "Session complete";
  else if (isRunning) status = "Running";
  else if (secondsLeft === totalSeconds) status = "Ready";

  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-6xl font-bold tabular-nums text-navy">{formatTime(secondsLeft)}</p>
      <p role="status" className={`text-sm font-medium ${isFinished ? "text-green-700" : "text-slate-500"}`}>
        {status}
      </p>
      <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
      </div>
      <TimerControls
        isRunning={isRunning && !isFinished}
        canStart={!isFinished}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={handleReset}
      />
    </div>
  );
}