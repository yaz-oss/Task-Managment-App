import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import {
  Mail,
  Lock,
  LogIn,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>

        </div>

        <div className="space-y-5">

          <div className="flex items-center border rounded-2xl px-4">

            <Mail
              className="text-gray-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 outline-none rounded-2xl"
            />

          </div>

          <div className="flex items-center border rounded-2xl px-4">

            <Lock
              className="text-gray-400"
              size={20}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 outline-none rounded-2xl"
            />

          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
          >
            <LogIn size={20} />
            Login
          </button>

        </div>

        <p className="text-center text-gray-500 mt-6">

          Don’t have an account?

          <Link
            to="/register"
            className="text-indigo-600 font-semibold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;