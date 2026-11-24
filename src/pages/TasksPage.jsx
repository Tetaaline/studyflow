import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import useDebounce from "../hooks/useDebounce";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useToggle from "../hooks/useToggle";

const DEFAULT_FILTERS = { search: "", category: "all", status: "all", sortBy: "dueDate" };
const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

export default function TasksPage({ tasks, compactCards, onAdd, onUpdate, onToggle, onDelete }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFormOpen, toggleForm, setFormOpen] = useToggle(false);
  const [editingTask, setEditingTask] = useState(null);
  const titleInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const debouncedSearch = useDebounce(filters.search, 300);

  const pendingCount = tasks.filter((task) => !task.completed).length;
  useDocumentTitle(`Tasks (${pendingCount} pending)`);

  useEffect(() => {
    if (isFormOpen) titleInputRef.current?.focus();
  }, [isFormOpen, editingTask]);

  const visibleTasks = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return tasks
      .filter((task) => task.title.toLowerCase().includes(query))
      .filter((task) => filters.category === "all" || task.category === filters.category)
      .filter((task) => {
        if (filters.status === "completed") return task.completed;
        if (filters.status === "pending") return !task.completed;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "title") return a.title.localeCompare(b.title);
        if (filters.sortBy === "priority") return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [tasks, debouncedSearch, filters.category, filters.status, filters.sortBy]);

  function handleFilterChange(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
    searchInputRef.current?.focus();
  }

  function openAddForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(null);
  }

  const handleEdit = useCallback(
    (task) => {
      setEditingTask(task);
      setFormOpen(true);
    },
    [setFormOpen]
  );

  function handleSubmit(taskData) {
    if (editingTask) onUpdate(taskData);
    else onAdd(taskData);
    closeForm();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">My tasks</h1>
          <p className="text-slate-500">Organise and update your plan.</p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null);
            toggleForm();
          }}
        >
          {isFormOpen ? "Close form" : "+ Add new task"}
        </Button>
      </div>

      {isFormOpen && (
        <TaskForm
          key={editingTask?.id ?? "new"}
          ref={titleInputRef}
          initialTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <TaskFilters ref={searchInputRef} filters={filters} onFilterChange={handleFilterChange} />

      {tasks.length === 0 ? (
        <EmptyState title="No tasks yet" message="Add your first study task to get started.">
          <Button onClick={openAddForm}>Add a task</Button>
        </EmptyState>
      ) : visibleTasks.length === 0 ? (
        <EmptyState title="No matching tasks" message="Nothing matches your search or filters.">
          <Button variant="secondary" onClick={clearFilters}>Clear filters</Button>
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              compact={compactCards}
              onToggle={onToggle}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}

      <p className="text-sm text-slate-500">
        Showing {visibleTasks.length} of {tasks.length} tasks
      </p>
    </div>
  );
}