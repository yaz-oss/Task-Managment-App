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
  UserPlus,
} from "lucide-react";

function Register() {

  const navigate =
    useNavigate();

  const [darkMode,
    setDarkMode] =
    useState(true);

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
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

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
          "Registration successful"
        );

        navigate("/");

      } catch (error: unknown) {

        const message =
          axios.isAxiosError(error)
            ? (error.response?.data as { message?: string } | undefined)
                ?.message
            : undefined;

        alert(
          message ||
          "Registration failed"
        );
      }
    };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1974&auto=format&fit=crop')",
      }}
    >

      
      {/* Register Card */}

      <div className="flex-1 flex items-center justify-center">

        <div
          className={`w-[360px] backdrop-blur-md border shadow-2xl rounded-2xl px-8 py-7 ${
            darkMode
              ? "bg-black/35 border-white/20 text-white"
              : "bg-white/70 border-gray-200 text-black"
          }`}
        >

          {/* Top */}

          <div className="flex justify-between items-center mb-5">

            <h1 className="text-2xl font-bold">

              Register

            </h1>

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? "bg-white/10"
                  : "bg-gray-200"
              }`}
            >

              {darkMode
                ? <Sun size={18} />
                : <Moon size={18} />}

            </button>

          </div>

          {/* Icon */}

          <div className="flex justify-center mb-5">

            <div className="bg-blue-600 p-4 rounded-full shadow-lg">

              <UserPlus
                size={28}
              />

            </div>

          </div>

          {/* Form */}

          <form
            onSubmit={
              handleRegister
            }
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className={`w-full p-3 rounded-lg outline-none ${
                darkMode
                  ? "bg-white/10 text-white placeholder-gray-300"
                  : "bg-gray-100 text-black"
              }`}
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
              className={`w-full p-3 rounded-lg outline-none ${
                darkMode
                  ? "bg-white/10 text-white placeholder-gray-300"
                  : "bg-gray-100 text-black"
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
              className={`w-full p-3 rounded-lg outline-none ${
                darkMode
                  ? "bg-white/10 text-white placeholder-gray-300"
                  : "bg-gray-100 text-black"
              }`}
            />

            {/* Buttons */}

            <div className="flex flex-col gap-3 pt-2">

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg text-white font-semibold"
              >

                Register

              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "http://localhost:5000/api/auth/google";
                }}
                className="w-full bg-white text-black hover:bg-gray-200 transition-all p-3 rounded-lg font-semibold flex items-center justify-center gap-3"
              >

                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                />

                Register with Google

              </button>

            </div>

          </form>

          {/* Footer */}

          <p className="text-center text-sm mt-5 text-gray-300">

            Already have an account?

            <Link
              to="/"
              className="text-blue-400 ml-2 hover:underline"
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
