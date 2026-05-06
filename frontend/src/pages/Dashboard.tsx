import { useEffect, useState } from "react";
import axios from "axios";
import {LayoutDashboard,ListTodo,Settings,LogOut,Moon,Sun,Plus,Trash2,Check,Pencil,Save} from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dark, setDark] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addTask = async () => {
    if (!title) return;

    await axios.post("http://localhost:5000/api/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task: Task) => {
    await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = async (id: number) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      title: editTitle,
      description: editDesc,
    });
    setEditingId(null);
    fetchTasks();
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition">

      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">
          TaskFlow
        </h1>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <ListTodo size={18} /> Tasks
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center justify-center gap-2 w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-lg">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">

        <h2 className="text-2xl mb-6 dark:text-white">Dashboard</h2>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
          <div className="flex gap-3">
            <input
              placeholder="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
            />

            <button
              onClick={addTask}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 rounded-lg"
            >
              <Plus size={18} /> Add
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg flex justify-between items-center ${
                  task.completed ? "opacity-60 line-through" : ""
                }`}
              >
                {editingId === task.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      value={editTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditTitle(e.target.value)
                      }
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      value={editDesc}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditDesc(e.target.value)
                      }
                      className="flex-1 p-2 border rounded"
                    />
                    <button onClick={() => saveEdit(task.id)}>
                      <Save size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-semibold dark:text-white">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button onClick={() => toggleComplete(task)}>
                        <Check size={18} />
                      </button>

                      <button onClick={() => startEdit(task)}>
                        <Pencil size={18} />
                      </button>

                      <button onClick={() => deleteTask(task.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;