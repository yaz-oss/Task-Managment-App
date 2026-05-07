import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "../app/store";

import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../features/tasks/taskSlice";

import {
  LayoutDashboard,
  Plus,
  Trash2,
  Pencil,
  Save,
  Check,
  LogOut,
  Shield,
  Moon,
  Sun,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {

  const dispatch =
    useDispatch<AppDispatch>();

  const navigate =
    useNavigate();

  const tasks =
    useSelector(
      (
        state: RootState
      ) =>
        state.tasks.tasks
    );

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<
    number | null
  >(null);

  const [
    editTitle,
    setEditTitle,
  ] = useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/");
    }

    dispatch(fetchTasks());

  }, [dispatch, navigate]);

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

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  const handleAddTask =
    async () => {

      if (
        !title ||
        !description
      )
        return;

      await dispatch(
        addTask({
          title,
          description,
        })
      );

      setTitle("");

      setDescription("");
    };

  const handleDelete =
    async (
      id: number
    ) => {

      await dispatch(
        deleteTask(id)
      );
    };

  const handleToggle =
    async (
      task: Task
    ) => {

      await dispatch(
        updateTask({
          ...task,

          completed:
            !task.completed,
        })
      );
    };

  const startEdit = (
    task: Task
  ) => {

    setEditingId(task.id);

    setEditTitle(
      task.title
    );

    setEditDescription(
      task.description
    );
  };

  const saveEdit =
    async (
      id: number
    ) => {

      const currentTask =
        tasks.find(
          (
            task
          ) =>
            task.id === id
        );

      await dispatch(
        updateTask({
          id,

          title:
            editTitle,

          description:
            editDescription,

          completed:
            currentTask?.completed,
        })
      );

      setEditingId(null);
    };

  return (

    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">

      <aside className="w-72 bg-indigo-700 text-white p-6 flex flex-col shadow-2xl">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            TaskFlow
          </h1>

          <button className="w-full bg-white text-indigo-700 flex items-center gap-3 px-4 py-4 rounded-2xl font-semibold">

            <LayoutDashboard size={22} />

            Dashboard

          </button>

        </div>

        <div className="mt-auto space-y-4">

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="w-full bg-gray-200 text-black dark:bg-gray-800 dark:text-white flex items-center justify-center gap-2 py-4 rounded-2xl"
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

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 py-4 rounded-2xl"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      <main className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold dark:text-white">

              Welcome{" "}
              {user.username}

            </h1>

            <p className="text-gray-500 dark:text-gray-300 mt-2">

              Manage your tasks professionally

            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">

            <Shield
              className="text-indigo-600"
              size={22}
            />

            <span className="font-semibold dark:text-white capitalize">

              {user.role}

            </span>

          </div>

        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6 dark:text-white">

            Create Task

          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl border dark:bg-gray-700 dark:text-white outline-none"
            />

            <input
              type="text"
              placeholder="Task description"
              value={
                description
              }
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="p-4 rounded-2xl border dark:bg-gray-700 dark:text-white outline-none"
            />

            <button
              onClick={
                handleAddTask
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-2"
            >

              <Plus size={20} />

              Add Task

            </button>

          </div>

        </div>

        <div className="grid gap-5">

          {tasks.map(
            (task: Task) => (

              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6"
              >

                {editingId ===
                task.id ? (

                  <div className="space-y-4">

                    <input
                      value={
                        editTitle
                      }
                      onChange={(
                        e
                      ) =>
                        setEditTitle(
                          e.target
                            .value
                        )
                      }
                      className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                    />

                    <textarea
                      value={
                        editDescription
                      }
                      onChange={(
                        e
                      ) =>
                        setEditDescription(
                          e.target
                            .value
                        )
                      }
                      className="w-full p-4 rounded-2xl border dark:bg-gray-700 dark:text-white"
                    />

                    <button
                      onClick={() =>
                        saveEdit(
                          task.id
                        )
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
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

                        <h2
                          className={`text-2xl font-bold dark:text-white ${
                            task.completed
                              ? "line-through text-gray-400"
                              : ""
                          }`}
                        >

                          {
                            task.title
                          }

                        </h2>

                      </div>

                      <p
                        className={`${
                          task.completed
                            ? "text-gray-400"
                            : "text-gray-500 dark:text-gray-300"
                        }`}
                      >

                        {
                          task.description
                        }

                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleToggle(
                            task
                          )
                        }
                        className="p-3 bg-green-100 text-green-600 rounded-xl"
                      >

                        <Check
                          size={18}
                        />

                      </button>

                      <button
                        onClick={() =>
                          startEdit(
                            task
                          )
                        }
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl"
                      >

                        <Pencil
                          size={18}
                        />

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            task.id
                          )
                        }
                        className="p-3 bg-red-100 text-red-600 rounded-xl"
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                  </div>

                )}

              </div>

            )
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;