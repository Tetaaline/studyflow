import Button from "./Button";

export default function TimerControls({ isRunning, canStart, onStart, onPause, onReset }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {isRunning ? (
        <Button onClick={onPause}>Pause</Button>
      ) : (
        <Button onClick={onStart} disabled={!canStart}>Start</Button>
      )}
      <Button variant="secondary" onClick={onReset}>Reset</Button>
    </div>
  );
}