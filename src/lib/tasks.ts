export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export function addTask(tasks: Task[], text: string, id: string): Task[] {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return tasks;
  }

  return [...tasks, { id, text: trimmedText, done: false }];
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
