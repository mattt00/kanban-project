const columns = [
  { key: "todo", title: "To Do" },
  { key: "in_progress", title: "In Progress" },
  { key: "done", title: "Done" },
];

export default function KanbanBoard({
  tasks,
  onDeleteTask,
  onStatusChange,
}) {
  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="board">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.key);

        return (
          <section className="column" key={column.key}>
            <div className="column-header">
              <h2>{column.title}</h2>
              <span>{columnTasks.length}</span>
            </div>

            <div className="column-body">
              {columnTasks.length === 0 && (
                <p className="empty-text">Brak zadań</p>
              )}

              {columnTasks.map((task) => (
                <article className="task-card" key={task.id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <small>{task.project?.name}</small>

                  <div className="task-actions">
                    {task.status !== "todo" && (
                      <button onClick={() => onStatusChange(task.id, "todo")}>
                        Do To Do
                      </button>
                    )}

                    {task.status !== "in_progress" && (
                      <button
                        onClick={() =>
                          onStatusChange(task.id, "in_progress")
                        }
                      >
                        Do In Progress
                      </button>
                    )}

                    {task.status !== "done" && (
                      <button onClick={() => onStatusChange(task.id, "done")}>
                        Do Done
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}