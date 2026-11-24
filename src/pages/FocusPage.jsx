import { useState } from "react";
import FocusTimer from "../components/FocusTimer";
import SectionCard from "../components/SectionCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MODES = ["study", "break"];

export default function FocusPage({ settings }) {
  const [mode, setMode] = useState("study");
  useDocumentTitle(mode === "study" ? "Focus" : "Break");
  const minutes = mode === "study" ? settings.studyMinutes : settings.breakMinutes;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Focus</h1>
        <p className="text-slate-500">One session at a time.</p>
      </div>

      <div role="group" aria-label="Session type" className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
        {MODES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`rounded-md px-4 py-2 text-sm font-medium capitalize ${
              mode === item ? "bg-accent text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <SectionCard>
        <FocusTimer
          key={`${mode}-${minutes}`}
          minutes={minutes}
          label={mode === "study" ? "Study session" : "Break"}
        />
      </SectionCard>
    </div>
  );
}