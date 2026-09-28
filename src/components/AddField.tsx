import { useState, type FormEvent } from "react";

type AddFieldProps = {
  onAdd: (text: string) => void;
};

function AddField({ onAdd }: AddFieldProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    onAdd(text);
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
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
    </form>
  );
}

export default AddField;
