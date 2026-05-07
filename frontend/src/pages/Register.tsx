import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  Lock,
  User,
} from "lucide-react";

function Register() {

  const navigate =
    useNavigate();

  const [username,
    setUsername] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await axios.post(
          "http://localhost:5000/api/auth/register",

          {
            username,
            email,
            password,
          }
        );

        alert(
          "Account created successfully"
        );

        navigate("/");

      } catch (error: any) {

        alert(
          error.response?.data?.message ||
          "Registration failed"
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-white mb-2">

            Create Account

          </h1>

          <p className="text-gray-400">

            Start managing your tasks smarter

          </p>

        </div>

        <div className="space-y-5">

          <div className="relative">

            <User
              className="absolute left-4 top-4 text-gray-500"
              size={20}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full bg-[#1f2937] text-white placeholder-gray-500 border border-gray-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition"
            />

          </div>

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
              handleRegister
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all"
          >

            Create Account

          </button>

        </div>

        <div className="mt-8 text-center">

          <p className="text-gray-400">

            Already have an account?

            <Link
              to="/"
              className="text-blue-500 ml-2 hover:text-blue-400"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;