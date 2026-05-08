// Frontend/src/pages/Login.tsx

import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Moon,
  Sun,
  ShieldCheck,
} from "lucide-react";

function Login() {

  const navigate =
    useNavigate();

  const [darkMode,
    setDarkMode] =
    useState(true);

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            "http://localhost:5000/api/auth/login",

            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "username",
          response.data.username
        );

        localStorage.setItem(
          "role",
          response.data.role
        );

        if (
          response.data.role ===
          "admin"
        ) {

          navigate("/admin");

        } else {

          navigate("/dashboard");
        }

      } catch (error: any) {

        alert(
          error.response?.data
            ?.message ||
          "Login failed"
        );
      }
    };

  return (

    <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
      darkMode
        ? "bg-[#020617]"
        : "bg-gray-100"
    }`}>

      <button
        onClick={() =>
          setDarkMode(
            !darkMode
          )
        }
        className={`absolute top-6 right-6 p-3 rounded-full ${
          darkMode
            ? "bg-[#111827] text-white"
            : "bg-white text-black"
        }`}
      >

        {darkMode
          ? <Sun />
          : <Moon />}

      </button>

      <div className={`w-[420px] p-10 rounded-[35px] shadow-2xl border transition-all ${
        darkMode
          ? "bg-[#111827] border-gray-800 text-white"
          : "bg-white border-gray-200 text-black"
      }`}>

        <div className="flex flex-col items-center mb-8">

          <div className="bg-blue-600 p-5 rounded-3xl mb-5">

            <ShieldCheck
              size={40}
            />

          </div>

          <h1 className="text-4xl font-bold">

            Welcome Back

          </h1>

          <p className="text-gray-400 mt-2">

            Login to continue

          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className={`w-full p-4 rounded-2xl outline-none ${
              darkMode
                ? "bg-[#1e293b]"
                : "bg-gray-100"
            }`}
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
            className={`w-full p-4 rounded-2xl outline-none ${
              darkMode
                ? "bg-[#1e293b]"
                : "bg-gray-100"
            }`}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-2xl text-white font-bold"
          >

            Login

          </button>

        </form>

        <p className="text-center mt-6 text-gray-400">

          Don't have account?

          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;