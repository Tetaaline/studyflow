import { useState } from "react";
import Button from "../components/Button";
import SectionCard from "../components/SectionCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

const FIELD = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800";

function validate(values) {
  const study = Number(values.studyMinutes);
  const rest = Number(values.breakMinutes);
  if (!values.displayName.trim()) return "Please enter a display name.";
  if (!Number.isInteger(study) || study < 1 || study > 120) return "Study length must be a whole number from 1 to 120.";
  if (!Number.isInteger(rest) || rest < 1 || rest > 60) return "Break length must be a whole number from 1 to 60.";
  return "";
}

export default function SettingsPage({ settings, onSave }) {
  useDocumentTitle("Settings");
  const [draft, setDraft] = useState(settings);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setDraft((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setError("");
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message = validate(draft);
    if (message) {
      setError(message);
      return;
    }
    onSave({
      ...draft,
      displayName: draft.displayName.trim(),
      studyMinutes: Number(draft.studyMinutes),
      breakMinutes: Number(draft.breakMinutes),
    });
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-slate-500">Make StudyFlow yours.</p>
      </div>

      <SectionCard>
        <form onSubmit={handleSubmit} noValidate className="grid max-w-lg gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="displayName" className="text-sm font-medium text-slate-600">Display name</label>
            <input id="displayName" name="displayName" value={draft.displayName} onChange={handleChange} className={FIELD} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="studyMinutes" className="text-sm font-medium text-slate-600">Study session (minutes)</label>
              <input id="studyMinutes" type="number" min="1" max="120" name="studyMinutes" value={draft.studyMinutes} onChange={handleChange} className={FIELD} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="breakMinutes" className="text-sm font-medium text-slate-600">Break (minutes)</label>
              <input id="breakMinutes" type="number" min="1" max="60" name="breakMinutes" value={draft.breakMinutes} onChange={handleChange} className={FIELD} />
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" name="compactCards" checked={draft.compactCards} onChange={handleChange} className="h-5 w-5 accent-teal-700" />
            Use compact task cards
          </label>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {saved && <p role="status" className="text-sm text-green-700">Settings saved.</p>}

          <div>
            <Button type="submit">Save settings</Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}