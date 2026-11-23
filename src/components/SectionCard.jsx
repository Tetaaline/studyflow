export default function SectionCard({ title, action, className = "", children }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-2">
          {title && <h2 className="text-lg font-semibold text-navy">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}