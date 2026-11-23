const VARIANTS = {
  primary: "bg-accent text-white hover:bg-teal-800",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
};

export default function Button({ variant = "primary", type = "button", className = "", children, ...rest }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}