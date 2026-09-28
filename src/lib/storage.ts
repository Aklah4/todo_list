import type { Task } from "./tasks";

type TaskStorage = Pick<Storage, "getItem" | "setItem">;

const STORAGE_KEY = "todo-tasks";

function getBrowserStorage(): TaskStorage | null {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.text === "string" &&
    typeof task.done === "boolean"
  );
}

export function loadTasks(
  storage: TaskStorage | null = getBrowserStorage(),
): Task[] {
  if (!storage) {
    return [];
  }

  try {
    const storedTasks = storage.getItem(STORAGE_KEY);
    if (!storedTasks) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedTasks);
    if (!Array.isArray(parsed) || !parsed.every(isTask)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function saveTasks(
  tasks: Task[],
  storage: TaskStorage | null = getBrowserStorage(),
): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Ignore storage failures so persistence cannot break task interactions.
  }
}
