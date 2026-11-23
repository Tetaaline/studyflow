export default function EmptyState({ title, message, children }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="font-semibold text-navy">{title}</p>
      {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}