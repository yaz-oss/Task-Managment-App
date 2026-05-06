import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      navigate("/");
    } catch {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition">

      <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-600 to-indigo-600 text-white justify-center items-center flex-col">
        <h1 className="text-4xl font-bold mb-2">Join TaskFlow</h1>
        <p className="opacity-80">Create your account</p>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-5 text-center dark:text-white">
            Register
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="w-full p-3 mb-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 mb-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition"
          >
            Register
          </button>

          <p className="text-sm mt-4 text-center dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;