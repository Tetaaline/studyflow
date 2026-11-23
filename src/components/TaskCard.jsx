import { memo } from "react";
import Badge from "./Badge";
import Button from "./Button";
import formatDate from "../utils/formatDate";

const PRIORITY_TONE = { High: "danger", Medium: "warning", Low: "neutral" };

function TaskCard({ task, compact, onToggle, onEdit, onDelete }) {
  return (
    <li
      className={`flex items-start gap-3 rounded-xl border border-slate-200 bg-white shadow-sm ${
        compact ? "p-3" : "p-5"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
        className="mt-1 h-5 w-5 shrink-0 accent-teal-700"
      />

      <div className="min-w-0 flex-1">
        <p className={`break-words font-semibold ${task.completed ? "text-slate-400 line-through" : "text-navy"}`}>
          {task.title}
        </p>
        <p className="mt-1 text-sm text-slate-500">Due {formatDate(task.dueDate)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge tone="accent">{task.category}</Badge>
          <Badge tone={PRIORITY_TONE[task.priority]}>{task.priority} priority</Badge>
          <Badge tone={task.completed ? "success" : "neutral"}>
            {task.completed ? "Completed" : "Pending"}
          </Badge>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button variant="secondary" onClick={() => onEdit(task)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </li>
  );
}

export default memo(TaskCard);