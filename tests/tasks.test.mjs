import assert from "node:assert/strict";
import test from "node:test";
import { addTask, deleteTask, toggleTask } from "../src/lib/tasks.ts";

test("addTask appends a trimmed, incomplete task", () => {
  const existingTasks = [{ id: "existing", text: "Read", done: true }];
  const tasks = addTask(existingTasks, "  Write tests  ", "new-task");

  assert.deepEqual(tasks, [
    { id: "existing", text: "Read", done: true },
    { id: "new-task", text: "Write tests", done: false },
  ]);
  assert.notEqual(tasks, existingTasks);
});

test("addTask ignores empty or whitespace-only text", () => {
  const existingTasks = [{ id: "existing", text: "Read", done: false }];

  assert.equal(addTask(existingTasks, "", "unused"), existingTasks);
  assert.equal(addTask(existingTasks, "   ", "unused"), existingTasks);
});

test("toggleTask flips only the matching task's done state", () => {
  const existingTasks = [
    { id: "first", text: "Read", done: false },
    { id: "second", text: "Write", done: true },
  ];

  const completedTasks = toggleTask(existingTasks, "first");
  assert.deepEqual(completedTasks, [
    { id: "first", text: "Read", done: true },
    { id: "second", text: "Write", done: true },
  ]);

  const reopenedTasks = toggleTask(completedTasks, "first");
  assert.deepEqual(reopenedTasks, [
    { id: "first", text: "Read", done: false },
    { id: "second", text: "Write", done: true },
  ]);
});

test("toggleTask leaves the task list unchanged for an unknown id", () => {
  const existingTasks = [{ id: "first", text: "Read", done: false }];

  assert.equal(toggleTask(existingTasks, "missing"), existingTasks);
});

test("deleteTask removes only the task with the matching id", () => {
  const existingTasks = [
    { id: "first", text: "Read", done: false },
    { id: "second", text: "Write", done: true },
  ];

  assert.deepEqual(deleteTask(existingTasks, "first"), [
    { id: "second", text: "Write", done: true },
  ]);
});

test("deleteTask leaves the task list unchanged for an unknown id", () => {
  const existingTasks = [{ id: "first", text: "Read", done: false }];

  assert.equal(deleteTask(existingTasks, "missing"), existingTasks);
});
