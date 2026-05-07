import { useEffect, useState } from "react";

import axios from "axios";

import {
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  Pencil,
  LogOut,
  Moon,
  Sun,
  Plus,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [editingId,
    setEditingId] =
    useState<number | null>(null);

  const [darkMode,
    setDarkMode] =
    useState(true);

  const token =
    localStorage.getItem(
      "token"
    );

  const fetchTasks =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/tasks",

            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setTasks(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchTasks();

  }, []);

  const addTask =
    async () => {

      if (
        !title ||
        !description
      ) {
        return;
      }

      try {

        await axios.post(
          "http://localhost:5000/api/tasks",

          {
            title,
            description,
          },

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        setTitle("");

        setDescription("");

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };

  const deleteTask =
    async (id: number) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/tasks/${id}`,

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };

  const updateTask =
    async () => {

      try {

        await axios.put(
          `http://localhost:5000/api/tasks/${editingId}`,

          {
            title,
            description,
          },

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        setEditingId(null);

        setTitle("");

        setDescription("");

        fetchTasks();

      } catch (error) {

        console.log(error);
      }
    };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/";
  };

  return (

    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <div
        className={`w-[260px] p-6 flex flex-col justify-between ${
          darkMode
            ? "bg-[#111827]"
            : "bg-white"
        } shadow-2xl`}
      >

        <div>

          <div className="flex items-center gap-3 mb-12">

            <LayoutDashboard
              size={34}
            />

            <h1 className="text-2xl font-bold">

              TaskFlow

            </h1>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl cursor-pointer">

              <CheckCircle2 />

              <span>
                Dashboard
              </span>

            </div>

          </div>

        </div>

        <div className="space-y-4">

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-700 hover:bg-gray-600 transition"
          >

            {darkMode ? (
              <Sun />
            ) : (
              <Moon />
            )}

            Theme

          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-600 hover:bg-red-700 transition"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </div>

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">

              Welcome Back

            </h1>

            <p className="text-gray-400 mt-2">

              Manage your tasks beautifully

            </p>

          </div>

        </div>

        <div
          className={`p-6 rounded-3xl mb-10 ${
            darkMode
              ? "bg-[#111827]"
              : "bg-white"
          } shadow-xl`}
        >

          <h2 className="text-2xl font-bold mb-6">

            {editingId
              ? "Update Task"
              : "Create Task"}

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className={`p-4 rounded-2xl outline-none ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-gray-100"
              }`}
            />

            <input
              type="text"
              placeholder="Task description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className={`p-4 rounded-2xl outline-none ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-gray-100"
              }`}
            />

          </div>

          <button
            onClick={
              editingId
                ? updateTask
                : addTask
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl flex items-center gap-3 transition"
          >

            <Plus />

            {editingId
              ? "Update Task"
              : "Add Task"}

          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className={`p-6 rounded-3xl shadow-xl ${
                darkMode
                  ? "bg-[#111827]"
                  : "bg-white"
              }`}
            >

              <div className="flex justify-between items-start mb-5">

                <div>

                  <h2 className="text-2xl font-bold">

                    {task.title}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      task.description
                    }

                  </p>

                </div>

              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => {

                    setEditingId(
                      task.id
                    );

                    setTitle(
                      task.title
                    );

                    setDescription(
                      task.description
                    );
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                >

                  <Pencil size={18} />

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                >

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;