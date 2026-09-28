import { isTaskOverdue, type Task } from "../lib/tasks";

type TaskRowProps = {
  task: Task;
  number: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskRow({ task, number, onToggle, onDelete }: TaskRowProps) {
  const taskNumber = String(number).padStart(2, "0");
  const overdue = isTaskOverdue(task);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    })
      .format(new Date(`${date}T00:00:00Z`))
      .toUpperCase();
  }

  return (
    <li className="task-row">
      <span className="task-number" aria-hidden="true">
        {taskNumber}
      </span>
      <label className="task-checkbox-target">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark task ${task.text} as ${task.done ? "incomplete" : "complete"}`}
        />
      </label>
      <div className="task-content">
        <span className={task.done ? "task-text task-text--done" : "task-text"}>
          {task.text}
        </span>
        {(task.startDate || task.finishDate) && (
          <span className="task-metadata">
            {task.startDate && (
              <>
                <time dateTime={task.startDate}>
                  START {formatDate(task.startDate)}
                </time>
                {task.finishDate && " · "}
              </>
            )}
            {task.finishDate && (
              <time
                className={overdue ? "task-metadata--overdue" : undefined}
                dateTime={task.finishDate}
              >
                DUE {formatDate(task.finishDate)}
              </time>
            )}
          </span>
        )}
      </div>
      <button
        className="task-delete"
        type="button"
        aria-label={`Delete task: ${task.text}`}
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  );
}

export default TaskRow;
