import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}