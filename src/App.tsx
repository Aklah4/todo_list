import { useEffect, useState } from "react";
import AddField from "./components/AddField";
import Footer from "./components/Footer";
import Masthead from "./components/Masthead";
import TaskRow from "./components/TaskRow";
import { loadTasks, saveTasks } from "./lib/storage";
import { addTask, deleteTask, toggleTask, type Task } from "./lib/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleAddTask(text: string) {
    const id = crypto.randomUUID();
    setTasks((currentTasks) => addTask(currentTasks, text, id));
  }

  const openCount = tasks.filter((task) => !task.done).length;
  const doneCount = tasks.length - openCount;
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
    .format(new Date())
    .toUpperCase();

  return (
    <main className="page">
      <div className="meta-line">
        <time dateTime={new Date().toISOString().slice(0, 10)}>
          {dateLabel}
        </time>
        <span className="meta-count" aria-live="polite">
          {openCount} OPEN
        </span>
      </div>
      <Masthead />
      <AddField onAdd={handleAddTask} />
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              number={index + 1}
              onToggle={(id) =>
                setTasks((currentTasks) => toggleTask(currentTasks, id))
              }
              onDelete={(id) =>
                setTasks((currentTasks) => deleteTask(currentTasks, id))
              }
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">Nothing yet. A clear page.</p>
      )}
      <Footer
        doneCount={doneCount}
        onClearCompleted={() =>
          setTasks((currentTasks) => currentTasks.filter((task) => !task.done))
        }
      />
    </main>
  );
}

export default App;
