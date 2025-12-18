import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handelRegistration = async (e) =>{
        e.preventDefault()

        const {error} =await supabase.auth.signUp({email,password})
        if(error){
            setMessage(error.message)
        } else {
            setMessage("Registration successful! Check your email.")
            
        }
        setEmail("");
        setPassword("");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <form onSubmit={handelRegistration} className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Register to get started
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }
          }
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none
                     focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
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
          Register
        </button>

        <p className="text-sm text-center mt-3 text-red-500">
          {message}
        </p>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
