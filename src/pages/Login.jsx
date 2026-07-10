import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    setError("");

    try{
      const response=await fetch( `${API_URL}/login`,
        {
          method:"POST",
          headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          email,
          password,
        })
        }
      );
      const data=await response.json();
      if(!response.ok){
        setError(data.message);
        return;
      }
      localStorage.setItem(
        "trackly-user",
        JSON.stringify(data.user)
      );
      if(data.user.role==="admin"){
        navigate("/admin");

      }else if(data.user.role==="driver"){
        navigate("/driver");
      }else{
        navigate("/customer");
      }
    }catch(error){
      console.log(error);
      setError(error.message)
    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-96 border border-white/20"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Trackly Login
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

       <input
  type="email"
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

        <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-xs mt-3 text-center text-white/60">
          Try: admin@trackly.com / 1234
        </p>
      </form>
    </div>
  );
}