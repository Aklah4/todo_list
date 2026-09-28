import { useState, type FormEvent } from "react";

type AddFieldProps = {
  onAdd: (text: string, startDate?: string, finishDate?: string) => void;
};

function AddField({ onAdd }: AddFieldProps) {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    onAdd(text, startDate || undefined, finishDate || undefined);
    setText("");
    setStartDate("");
    setFinishDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-entry">
        <label className="visually-hidden" htmlFor="task-text">
          Add a task
        </label>
        <input
          className="task-input"
          id="task-text"
          name="task"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write something down…"
        />
        <button className="text-button" type="submit">
          ADD →
        </button>
      </div>
      <div className="task-date-fields">
        <label className="task-date-label" htmlFor="task-start-date">
          START
          <input
            id="task-start-date"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label className="task-date-label" htmlFor="task-finish-date">
          FINISH
          <input
            id="task-finish-date"
            name="finishDate"
            type="date"
            value={finishDate}
            onChange={(event) => setFinishDate(event.target.value)}
          />
        </label>
      </div>
    </form>
  );
}

export default AddField;
