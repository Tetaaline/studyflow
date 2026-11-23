export default function SummaryCard({ label, value, note }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-navy">{value}</p>
      {note && <p className="mt-1 text-xs text-accent">{note}</p>}
    </div>
  );
}