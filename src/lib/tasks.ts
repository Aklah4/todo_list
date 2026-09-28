export type Task = {
  id: string;
  text: string;
  done: boolean;
  startDate?: string;
  finishDate?: string;
};

export function addTask(
  tasks: Task[],
  text: string,
  id: string,
  startDate?: string,
  finishDate?: string,
): Task[] {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return tasks;
  }

  return [
    ...tasks,
    {
      id,
      text: trimmedText,
      done: false,
      ...(startDate ? { startDate } : {}),
      ...(finishDate ? { finishDate } : {}),
    },
  ];
}

function getLocalDateISO(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function isTaskOverdue(
  task: Task,
  today = getLocalDateISO(new Date()),
): boolean {
  return Boolean(task.finishDate && !task.done && task.finishDate < today);
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  if (!tasks.some((task) => task.id === id)) {
    return tasks;
  }

  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  );
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  if (!tasks.some((task) => task.id === id)) {
    return tasks;
  }

  return tasks.filter((task) => task.id !== id);
}
