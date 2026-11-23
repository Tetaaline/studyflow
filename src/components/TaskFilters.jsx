import { CATEGORIES } from "../data/categories";

const FIELD = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800";
const LABEL = "flex flex-col gap-1 text-sm font-medium text-slate-600";

export default function TaskFilters({ ref, filters, onFilterChange }) {
  function handleChange(event) {
    onFilterChange(event.target.name, event.target.value);
  }

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      <label className={LABEL}>
        Search
        <input
          ref={ref}
          type="search"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by task title..."
          className={FIELD}
        />
      </label>

      <label className={LABEL}>
        Category
        <select name="category" value={filters.category} onChange={handleChange} className={FIELD}>
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </label>

      <label className={LABEL}>
        Status
        <select name="status" value={filters.status} onChange={handleChange} className={FIELD}>
          <option value="all">All tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label className={LABEL}>
        Sort by
        <select name="sortBy" value={filters.sortBy} onChange={handleChange} className={FIELD}>
          <option value="dueDate">Due date (soonest)</option>
          <option value="title">Title (A–Z)</option>
          <option value="priority">Priority (high first)</option>
        </select>
      </label>
    </div>
  );
}