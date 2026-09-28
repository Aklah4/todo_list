import type { Task } from "../lib/tasks";

type TaskRowProps = {
  task: Task;
  number: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskRow({ task, number, onToggle, onDelete }: TaskRowProps) {
  const taskNumber = String(number).padStart(2, "0");

  return (
    <li className="task-row">
      <span className="task-number" aria-hidden="true">
        {taskNumber}
      </span>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark task ${task.text} as ${task.done ? "incomplete" : "complete"}`}
      />
      <span className={task.done ? "task-text task-text--done" : "task-text"}>
        {task.text}
      </span>
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
