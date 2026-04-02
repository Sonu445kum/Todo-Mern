import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Todo App</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}