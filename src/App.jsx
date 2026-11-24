import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";
import SiteLayout from "./layouts/SiteLayout";
import DashboardPage from "./pages/DashboardPage";
import FocusPage from "./pages/FocusPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import TasksPage from "./pages/TasksPage";

const DEFAULT_SETTINGS = {
  displayName: "Student",
  studyMinutes: 25,
  breakMinutes: 5,
  compactCards: false,
};

export default function App() {
  const [tasks, setTasks] = useLocalStorage("studyflow-tasks", initialTasks);
  const [settings, setSettings] = useLocalStorage("studyflow-settings", DEFAULT_SETTINGS);

  const addTask = useCallback(
    (taskData) => {
      setTasks((current) => [...current, { ...taskData, id: `task-${Date.now()}`, completed: false }]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (updated) => {
      setTasks((current) => current.map((task) => (task.id === updated.id ? { ...task, ...updated } : task)));
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((current) =>
        current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((current) => current.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  return (
    <Routes>
      <Route element={<SiteLayout displayName={settings.displayName} />}>
        <Route path="/" element={<DashboardPage tasks={tasks} settings={settings} />} />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              compactCards={settings.compactCards}
              onAdd={addTask}
              onUpdate={updateTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          }
        />
        <Route path="/focus" element={<FocusPage settings={settings} />} />
        <Route path="/settings" element={<SettingsPage settings={settings} onSave={setSettings} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}