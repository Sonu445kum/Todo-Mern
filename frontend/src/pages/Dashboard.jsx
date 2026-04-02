import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../features/todos/todoSlice";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos({}));
  }, []);

  return (
    <>
      <Navbar />
      <TodoForm />
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} />
      ))}
    </>
  );
}