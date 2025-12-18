import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate()

  const handelLogin = async (e) =>{
    e.preventDefault()

    const {error} = await supabase.auth.signInWithPassword({email,password})

    if(error){
        setErrorMsg(error.message)
    }
    else{
        navigate("/dashboard")
    }

    setEmail("")
    setPassword("")
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <form
        onSubmit={handelLogin}
        className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>
        

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none
                     focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none
                     focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg
                     font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3 text-red-500">{errorMsg}</p>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link  to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
