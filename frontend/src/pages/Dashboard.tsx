import { useEffect, useState } from "react";

import { LayoutDashboard,ListTodo,Settings,LogOut,Moon,Sun,Plus,Trash2,Pencil,Save,Check,} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../features/tasks/taskSlice";

import type {
  RootState,
  AppDispatch,
} from "../app/store";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  const handleAddTask = async () => {
    if (!title || !description) return;

    await dispatch(
      addTask({
        title,
        description,
      })
    );

    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteTask(id));
  };

  const handleToggleComplete = async (
    task: Task
  ) => {
    await dispatch(
      updateTask({
        ...task,
        completed: !task.completed,
      })
    );
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = async (id: number) => {
    await dispatch(
      updateTask({
        id,
        title: editTitle,
        description: editDescription,
        completed: false,
      })
    );

    setEditingId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">

      <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">

        <h1 className="text-3xl font-bold text-indigo-600 mb-10">
          TaskFlow
        </h1>

        <nav className="flex flex-col gap-4">

          <button className="flex items-center gap-3 bg-indigo-600 text-white px-4 py-3 rounded-2xl">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white transition">
            <ListTodo size={20} />
            Tasks
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white transition">
            <Settings size={20} />
            Settings
          </button>

        </nav>

        <div className="mt-auto flex flex-col gap-3">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 dark:text-white py-3 rounded-2xl"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>

          <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl">
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 p-8">

        <div className="mb-8">

          <h2 className="text-4xl font-bold dark:text-white">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 dark:text-gray-300">
            Manage your tasks professionally
          </p>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg mb-8">

          <h3 className="text-2xl font-semibold mb-6 dark:text-white">
            Create New Task
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="p-4 rounded-2xl border dark:bg-gray-700 dark:text-white outline-none"
            />

            <input
              type="text"
              placeholder="Task description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="p-4 rounded-2xl border dark:bg-gray-700 dark:text-white outline-none"
            />

            <button
              onClick={handleAddTask}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl"
            >
              <Plus size={20} />
              Add Task
            </button>

          </div>

        </div>

        <div className="grid gap-5">

          {tasks.map((task: Task) => (

            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >

              {editingId === task.id ? (

                <div className="space-y-4">

                  <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                    className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                  />

                  <button
                    onClick={() =>
                      saveEdit(task.id)
                    }
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl"
                  >
                    <Save size={18} />
                    Save
                  </button>

                </div>

              ) : (

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3 mb-2">

                      <div
                        className={`w-3 h-3 rounded-full ${
                          task.completed
                            ? "bg-green-500"
                            : "bg-yellow-400"
                        }`}
                      />

                      <h3
                        className={`text-2xl font-semibold dark:text-white ${
                          task.completed
                            ? "line-through text-gray-400"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h3>

                    </div>

                    <p
                      className={`${
                        task.completed
                          ? "text-gray-400"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      {task.description}
                    </p>

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleToggleComplete(task)
                      }
                      className="p-3 rounded-xl bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      <Check size={18} />
                    </button>

                    <button
                      onClick={() =>
                        startEdit(task)
                      }
                      className="p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(task.id)
                      }
                      className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;