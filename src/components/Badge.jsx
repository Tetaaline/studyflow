const TONES = {
  neutral: "bg-slate-100 text-slate-700",
  accent: "bg-teal-50 text-teal-800",
  warning: "bg-amber-50 text-amber-800",
  danger: "bg-red-50 text-red-700",
  success: "bg-green-50 text-green-800",
};

export default function Badge({ tone = "neutral", children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}