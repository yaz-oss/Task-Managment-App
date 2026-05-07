import { useEffect, useState } from "react";
import axios from "axios";
import {LayoutDashboard,ListTodo,Settings,LogOut,Moon,Sun,Plus,Trash2,Check,Pencil,Save,} from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {
  const API = "http://localhost:5000/api/tasks";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dark, setDark] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addTask = async () => {
    if (!title || !description) return;

    try {
      await axios.post(API, {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComplete = async (task: Task) => {
    try {
      await axios.put(`${API}/${task.id}`, {
        ...task,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = async (id: number) => {
    try {
      await axios.put(`${API}/${id}`, {
        title: editTitle,
        description: editDesc,
      });

      setEditingId(null);

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">

      <div className="w-64 bg-white dark:bg-gray-800 shadow-2xl p-5 flex flex-col">

        <h1 className="text-3xl font-bold text-indigo-600 mb-10">
          TaskFlow
        </h1>

        <nav className="flex flex-col gap-3">

          <button className="flex items-center gap-3 bg-indigo-600 text-white px-4 py-3 rounded-xl">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 rounded-xl dark:text-white transition">
            <ListTodo size={20} />
            Tasks
          </button>

          <button className="flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 rounded-xl dark:text-white transition">
            <Settings size={20} />
            Settings
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-3">

          <button
            onClick={() => setDark(!dark)}
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 dark:text-white py-3 rounded-xl transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold dark:text-white">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 dark:text-gray-300">
              Manage your daily tasks easily
            </p>
          </div>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg mb-8">

          <h3 className="text-xl font-semibold mb-5 dark:text-white">
            Create New Task
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="p-4 rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none"
            />

            <input
              type="text"
              placeholder="Task description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              className="p-4 rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none"
            />

            <button
              onClick={addTask}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all duration-300"
            >
              <Plus size={20} />
              Add Task
            </button>

          </div>
        </div>

        <div className="grid gap-4">

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-2xl transition-all duration-300 ${
                task.completed ? "opacity-70" : ""
              }`}
            >

              {editingId === task.id ? (
                <div className="space-y-4">

                  <input
                    value={editTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditTitle(e.target.value)
                    }
                    className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                  />

                  <textarea
                    value={editDesc}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setEditDesc(e.target.value)
                    }
                    className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                  />

                  <button
                    onClick={() => saveEdit(task.id)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl transition"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                </div>
              ) : (
                <div className="flex justify-between items-start gap-4">

                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">

                      <div
                        className={`w-3 h-3 rounded-full ${
                          task.completed
                            ? "bg-green-500"
                            : "bg-yellow-400"
                        }`}
                      />

                      <h3
                        className={`text-xl font-semibold dark:text-white ${
                          task.completed
                            ? "line-through text-gray-400"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h3>

                    </div>

                    <p
                      className={`text-sm ${
                        task.completed
                          ? "text-gray-400"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      {task.description}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">

                    <button
                      onClick={() => toggleComplete(task)}
                      className={`p-3 rounded-xl transition ${
                        task.completed
                          ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      <Check size={18} />
                    </button>

                    <button
                      onClick={() => startEdit(task)}
                      className="p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;