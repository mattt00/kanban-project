import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setSubmitting(true);

      await onAddTask({
        project_id: 1,
        title,
        description,
        status: "todo",
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Błąd formularza:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tytuł zadania"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Opis zadania"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Dodawanie..." : "Dodaj zadanie"}
      </button>
    </form>
  );
}