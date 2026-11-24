import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import SectionCard from "../components/SectionCard";
import SummaryCard from "../components/SummaryCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import formatDate from "../utils/formatDate";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage({ tasks, settings }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const upcoming = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  useDocumentTitle(`Dashboard (${pending} pending)`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">
          {getGreeting()}, {settings.displayName}
        </h1>
        <p className="text-slate-500">Here is what matters today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total tasks" value={total} note="All your plans" />
        <SummaryCard label="Completed" value={completed} note={`${progress}% done`} />
        <SummaryCard label="Pending" value={pending} note={pending === 0 ? "All caught up" : "Still to do"} />
      </div>

      <SectionCard title="Progress">
        <div
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-3 w-full overflow-hidden rounded-full bg-slate-100"
        >
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {completed} of {total} tasks completed
        </p>
      </SectionCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SectionCard
          title="Upcoming tasks"
          className="md:col-span-2"
          action={<Link to="/tasks" className="text-sm font-medium text-accent hover:underline">View all</Link>}
        >
          {upcoming.length === 0 ? (
            <EmptyState title="Nothing pending" message="Every task is done. Nice work!" />
          ) : (
            <ul className="divide-y divide-slate-100">
              {upcoming.map((task) => (
                <li key={task.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div className="min-w-0">
                    <p className="break-words font-medium text-navy">{task.title}</p>
                    <p className="text-sm text-slate-500">Due {formatDate(task.dueDate)}</p>
                  </div>
                  <Badge tone="accent">{task.category}</Badge>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Focus session">
          <p className="text-4xl font-bold tabular-nums text-navy">
            {String(settings.studyMinutes).padStart(2, "0")}:00
          </p>
          <p className="mt-1 text-sm text-slate-500">Your study session length</p>
          <Link
            to="/focus"
            className="mt-4 block rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-800"
          >
            Start focus
          </Link>
        </SectionCard>
      </div>
    </div>
  );
}