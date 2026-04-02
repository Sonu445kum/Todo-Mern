import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todos/todoSlice";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(createTodo({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button>Add</button>
    </form>
  );
}