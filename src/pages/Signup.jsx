import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
try{
  const response=await fetch(`${API_URL}/signup`,{
    method:"POST",
    headers:{ "Content-Type": "application/json",},
    body:JSON.stringify({
      name,
      email,
      password,
    }),

  });
  const data=await response.json();
  if(!response.ok){
    setError(data.message);
    return;
  }
  localStorage.setItem("trackly-user",JSON.stringify(data.user));
  navigate("/customer");

}catch(error){
setError("Server error");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-96 border border-white/20"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Customer Signup
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <input
          className="w-full p-2 mb-3 rounded bg-white/10 border border-white/20"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-white/10 border border-white/20"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-white/10 border border-white/20"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition">
          Create Account
        </button>

        <p className="text-xs mt-3 text-center text-white/60">
          After signup you will be logged in automatically
        </p>
      </form>
    </div>
  );
}