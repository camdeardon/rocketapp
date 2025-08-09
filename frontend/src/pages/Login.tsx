
// 📁 src/pages/Login.tsx
import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post("/auth/jwt/create/", { email, password });
    localStorage.setItem("jwt", data.access);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded border px-3 py-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded border px-3 py-2" />
      <button type="submit" className="w-full rounded-full bg-primary text-white py-2">Login</button>
    </form>
  );
}
