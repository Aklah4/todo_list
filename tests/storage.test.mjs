import assert from "node:assert/strict";
import test from "node:test";
import { loadTasks, saveTasks } from "../src/lib/storage.ts";

const STORAGE_KEY = "todo-tasks";

function createMemoryStorage(initialValue = null) {
  let value = initialValue;

  return {
    getItem(key) {
      assert.equal(key, STORAGE_KEY);
      return value;
    },
    setItem(key, nextValue) {
      assert.equal(key, STORAGE_KEY);
      value = nextValue;
    },
    read() {
      return value;
    },
  };
}

test("saveTasks stores tasks and loadTasks restores them", () => {
  const storage = createMemoryStorage();
  const tasks = [
    { id: "task-1", text: "Write tests", done: false },
    { id: "task-2", text: "Review changes", done: true },
  ];

  saveTasks(tasks, storage);

  assert.equal(storage.read(), JSON.stringify(tasks));
  assert.deepEqual(loadTasks(storage), tasks);
});

test("loadTasks falls back to an empty list for empty or corrupted data", () => {
  assert.deepEqual(loadTasks(createMemoryStorage()), []);
  assert.deepEqual(loadTasks(createMemoryStorage("")), []);
  assert.deepEqual(loadTasks(createMemoryStorage("{not json")), []);
  assert.deepEqual(loadTasks(createMemoryStorage('[{"id": 1}]')), []);
  assert.deepEqual(loadTasks(createMemoryStorage("{}")), []);
});

test("loadTasks falls back to an empty list when storage access fails", () => {
  const storage = {
    getItem() {
      throw new Error("Storage unavailable");
    },
    setItem() {
      throw new Error("Storage unavailable");
    },
  };

  assert.deepEqual(loadTasks(storage), []);
  assert.doesNotThrow(() => saveTasks([], storage));
});
