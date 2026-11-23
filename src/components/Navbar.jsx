import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/tasks", label: "Tasks" },
  { to: "/focus", label: "Focus" },
  { to: "/settings", label: "Settings" },
];

export default function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white md:static md:border-0 md:bg-transparent"
    >
      <ul className="grid grid-cols-4 md:block md:space-y-1">
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `block px-2 py-3 text-center text-sm font-medium md:rounded-lg md:px-4 md:py-2 md:text-left ${
                  isActive
                    ? "text-accent md:bg-white/10 md:text-white"
                    : "text-slate-500 md:text-slate-300 md:hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}