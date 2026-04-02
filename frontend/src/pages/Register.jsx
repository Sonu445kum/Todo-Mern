import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}