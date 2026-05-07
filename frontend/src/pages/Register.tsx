import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Account created");

      navigate("/");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to start
          </p>

        </div>

        <div className="space-y-5">

          <div className="flex items-center border rounded-2xl px-4">

            <User
              className="text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-4 outline-none rounded-2xl"
            />

          </div>

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
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
          >
            <UserPlus size={20} />
            Register
          </button>

        </div>

        <p className="text-center text-gray-500 mt-6">

          Already have account?

          <Link
            to="/"
            className="text-indigo-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;