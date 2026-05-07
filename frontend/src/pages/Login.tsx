import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
} from "lucide-react";

function Login() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const res =
          await axios.post(
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
          "role",
          res.data.role
        );

        navigate("/dashboard");

      } catch (error: any) {

        alert(
          error.response?.data?.message ||
          "Login failed"
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white mb-2">

            Welcome Back

          </h1>

          <p className="text-gray-400">

            Login to continue

          </p>

        </div>

        <div className="space-y-5">

          <div className="relative">

            <Mail
              className="absolute left-4 top-4 text-gray-500"
              size={20}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-[#1f2937] text-white placeholder-gray-500 border border-gray-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition"
            />

          </div>

          <div className="relative">

            <Lock
              className="absolute left-4 top-4 text-gray-500"
              size={20}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-[#1f2937] text-white placeholder-gray-500 border border-gray-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition"
            />

          </div>

          <button
            onClick={
              handleLogin
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all"
          >

            Login

          </button>

        </div>

        <div className="mt-8 text-center">

          <p className="text-gray-400">

            Don’t have an account?

            <Link
              to="/register"
              className="text-blue-500 ml-2 hover:text-blue-400"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;