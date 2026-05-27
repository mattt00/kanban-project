import { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskForm from "./components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi,
} from "./api/tasksApi";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setErrorMessage("");
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Błąd pobierania tasków:", error);
        setErrorMessage("Nie udało się pobrać zadań z backendu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      setErrorMessage("");
      const createdTask = await createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
    } catch (error) {
      console.error("Błąd dodawania taska:", error);
      setErrorMessage("Nie udało się dodać zadania.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setErrorMessage("");
      await deleteTaskApi(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Błąd usuwania taska:", error);
      setErrorMessage("Nie udało się usunąć zadania.");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const oldTask = tasks.find((task) => task.id === taskId);

    if (!oldTask || oldTask.status === newStatus) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      setErrorMessage("");
      const updatedTask = await updateTask(taskId, { status: newStatus });

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Błąd aktualizacji statusu:", error);
      setErrorMessage("Nie udało się zaktualizować statusu zadania.");

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: oldTask.status } : task
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="app">
        <p>Ładowanie danych...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Project</h1>
        <p>React + Laravel API</p>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <TaskForm onAddTask={addTask} />

      <KanbanBoard
        tasks={tasks}
        onDeleteTask={deleteTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}