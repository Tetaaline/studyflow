import { useState } from "react";
import Button from "./Button";
import { CATEGORIES, PRIORITIES } from "../data/categories";

const EMPTY_TASK = { title: "", category: CATEGORIES[0], dueDate: "", priority: "Medium" };
const FIELD = "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800";

function validate(values) {
  const errors = {};
  const title = values.title.trim();
  if (!title) errors.title = "Please give your task a title.";
  else if (title.length < 3) errors.title = "The title should be at least 3 characters.";
  if (!values.dueDate) errors.dueDate = "Please choose a due date.";
  return errors;
}

export default function TaskForm({ ref, initialTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialTask ?? EMPTY_TASK);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({ ...form, title: form.title.trim() });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3"
    >
      <h2 className="text-lg font-semibold text-navy sm:col-span-3">
        {initialTask ? "Edit task" : "Add a new task"}
      </h2>

      <div className="flex flex-col gap-1 sm:col-span-3">
        <label htmlFor="task-title" className="text-sm font-medium text-slate-600">Title</label>
        <input
          id="task-title"
          ref={ref}
          name="title"
          value={form.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
          className={`${FIELD} ${errors.title ? "border-red-500" : "border-slate-300"}`}
        />
        {errors.title && <p id="task-title-error" className="text-sm text-red-700">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="task-category" className="text-sm font-medium text-slate-600">Category</label>
        <select id="task-category" name="category" value={form.category} onChange={handleChange} className={`${FIELD} border-slate-300`}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="task-priority" className="text-sm font-medium text-slate-600">Priority</label>
        <select id="task-priority" name="priority" value={form.priority} onChange={handleChange} className={`${FIELD} border-slate-300`}>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="task-due" className="text-sm font-medium text-slate-600">Due date</label>
        <input
          id="task-due"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          aria-invalid={Boolean(errors.dueDate)}
          aria-describedby={errors.dueDate ? "task-due-error" : undefined}
          className={`${FIELD} ${errors.dueDate ? "border-red-500" : "border-slate-300"}`}
        />
        {errors.dueDate && <p id="task-due-error" className="text-sm text-red-700">{errors.dueDate}</p>}
      </div>

      <div className="flex flex-wrap justify-end gap-2 sm:col-span-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialTask ? "Save changes" : "Add task"}</Button>
      </div>
    </form>
  );
}