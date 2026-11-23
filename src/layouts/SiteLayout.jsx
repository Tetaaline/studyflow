import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SiteLayout({ displayName }) {
  const initial = displayName.trim().charAt(0).toUpperCase() || "S";

  return (
    <div className="min-h-screen md:flex">
      <aside className="md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:bg-navy md:p-5">
        <div className="hidden md:mb-8 md:block">
          <p className="text-2xl font-bold text-white">studyflow</p>
          <p className="text-xs uppercase tracking-wider text-slate-400">Your study space</p>
        </div>
        <Navbar />
      </aside>

      <div className="flex-1 pb-20 md:pb-0">
        <header className="flex items-center border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <p className="text-lg font-bold text-navy md:hidden">studyflow</p>
          <span
            title={displayName}
            className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-teal-50 font-semibold text-teal-800"
          >
            {initial}
          </span>
        </header>
        <main className="mx-auto max-w-5xl p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}