// TaskList.jsx
import "./TaskList.css";

export default function TaskList({
  tasks,
  editingId,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onStatusChange
}) {
  if (!tasks || tasks.length === 0) {
    return <div className="no-tasks">No tasks available.</div>;
  }

  return (
    <section className="task-section">
      <div className="task-section-header">
        <h2>Active Tasks</h2>
        <div className="task-filter-options">
          <p>{tasks.length} total tasks</p>
        </div>
      </div>

      <div className="task-card">
        <div className="task-list-table">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-row ${task.completed ? "completed" : ""}`}
            >
              <div className="task-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9068/9068645.png"
                  alt="Task Icon"
                />
              </div>

              <div className="task-details">
                <dt>{task.title}</dt>
                <dd>{task.description}</dd>
              </div>

              <div className="task-actions">
                {!task.completed && (
                  <button
                    className="icon-button"
                    onClick={() => onStatusChange(task.id)}
                    title="Mark Complete"
                  >
                    <i className="ph-check-circle"></i>
                  </button>
                )}

                <button
                  className="icon-button"
                  onClick={() =>
                    editingId === task.id ? onSave(task.id) : onEdit(task.id)
                  }
                  title={editingId === task.id ? "Save" : "Edit"}
                >
                  <i
                    className={
                      editingId === task.id ? "ph-floppy-disk" : "ph-pencil"
                    }
                  ></i>
                </button>

                <button
                  className="icon-button"
                  onClick={() => onDelete(task.id)}
                  title="Delete"
                >
                  <i className="ph-trash"></i>
                </button>

                {editingId === task.id && (
                  <button
                    className="icon-button"
                    onClick={onCancel}
                    title="Cancel"
                  >
                    <i className="ph-x-circle"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
