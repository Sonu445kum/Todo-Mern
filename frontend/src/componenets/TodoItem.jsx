import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div>
      {todo.title}
      <button onClick={() => dispatch(deleteTodo(todo._id))}>
        Delete
      </button>
    </div>
  );
}