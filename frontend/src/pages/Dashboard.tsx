import { useEffect, useState } from "react";

import axios from "axios";

import {
  LayoutDashboard,
  Plus,
  Trash2,
  Pencil,
  Check,
  Moon,
  Sun,
  LogOut,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

type TaskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {

  const navigate =
    useNavigate();

  const username =
    localStorage.getItem(
      "username"
    );

  const token =
    localStorage.getItem(
      "token"
    );

  const [tasks,
    setTasks] =
    useState<TaskType[]>([]);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [editingId,
    setEditingId] =
    useState<number | null>(
      null
    );

  const [darkMode,
    setDarkMode] =
    useState(true);

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

        setTasks(
          res.data
        );

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
      ) return;

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
    async (id: number) => {

      try {

        await axios.put(
          `http://localhost:5000/api/tasks/${id}`,

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

  const logout =
    () => {

      localStorage.clear();

      navigate("/");
    };

  return (

    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* SIDEBAR */}

      <div
        className={`w-72 h-screen fixed left-0 top-0 border-r flex flex-col justify-between p-6 ${
          darkMode
            ? "bg-[#111827] border-gray-800"
            : "bg-white border-gray-300"
        }`}
      >

        <div>

          {/* LOGO */}

          <div className="mb-12">

            <h1 className="text-3xl font-bold">

              TaskFlow

            </h1>

            <p className="text-gray-400 mt-2">

              Productivity Dashboard

            </p>

          </div>

          {/* MENU */}

          <div className="space-y-4">

            <div className="bg-blue-600 text-white p-4 rounded-2xl flex items-center gap-4">

              <LayoutDashboard />

              Dashboard

            </div>

            <div
              className={`p-4 rounded-2xl flex items-center justify-between ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-gray-200"
              }`}
            >

              <div className="flex items-center gap-4">

                <ClipboardList />

                Total Tasks

              </div>

              <span className="font-bold">

                {tasks.length}

              </span>

            </div>

            <div
              className={`p-4 rounded-2xl flex items-center justify-between ${
                darkMode
                  ? "bg-[#1f2937]"
                  : "bg-gray-200"
              }`}
            >

              <div className="flex items-center gap-4">

                <CheckCircle2 />

                Completed

              </div>

              <span className="font-bold">

                {
                  tasks.filter(
                    (task) =>
                      task.completed
                  ).length
                }

              </span>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="space-y-4">

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 ${
              darkMode
                ? "bg-[#1f2937]"
                : "bg-gray-200"
            }`}
          >

            {darkMode
              ? <Sun />
              : <Moon />}

            Theme

          </button>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-2xl flex items-center justify-center gap-3 text-white"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="ml-72 flex-1 p-8">

        {/* TOP */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            Welcome,
            {" "}
            {username}

          </h1>

          <p className="text-gray-400 mt-3">

            Organize your work professionally

          </p>

        </div>

        {/* CREATE */}

        <div
          className={`rounded-3xl p-6 mb-10 ${
            darkMode
              ? "bg-[#111827]"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-bold mb-6">

            {editingId
              ? "Edit Task"
              : "Create Task"}

          </h2>

          <div className="grid md:grid-cols-2 gap-4">

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
            onClick={() =>

              editingId
                ? updateTask(
                    editingId
                  )
                : addTask()
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl flex items-center gap-2 text-white"
          >

            {editingId
              ? <Check />
              : <Plus />}

            {editingId
              ? "Update Task"
              : "Add Task"}

          </button>

        </div>

        {/* TASKS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className={`rounded-3xl p-6 shadow-xl ${
                darkMode
                  ? "bg-[#111827]"
                  : "bg-white"
              }`}
            >

              <h2 className="text-2xl font-bold mb-2">

                {task.title}

              </h2>

              <p className="text-gray-400 mb-6">

                {task.description}

              </p>

              <div className="flex gap-4">

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
                  className="bg-yellow-500 px-4 py-2 rounded-2xl flex items-center gap-2 text-white"
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
                  className="bg-red-600 px-4 py-2 rounded-2xl flex items-center gap-2 text-white"
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