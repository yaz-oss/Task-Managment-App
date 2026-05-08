import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Moon,
  Sun,
  LogOut,
  Shield,
  Mail,
  Ban,
  Trash2,
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  UserId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  blocked: boolean;
  Tasks: Task[];
}

const AdminDashboard = () => {

  const navigate = useNavigate();

  const token =
  localStorage.getItem("token");

  const [users, setUsers] =
  useState<User[]>([]);

  const [search, setSearch] =
  useState("");

  const [darkMode, setDarkMode] =
  useState(true);

  const [activePage, setActivePage] =
  useState("dashboard");

  useEffect(() => {

    if (!token) {

      navigate("/login");
      return;
    }

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const response =
      await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteUser = async (
    id: number
  ) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const blockUser = async (
    id: number
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/admin/user/${id}/block`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // REMOVE ADMIN FROM USERS LIST

  const normalUsers =
  users.filter(
    (user) => user.role !== "admin"
  );

  const filteredUsers =
  normalUsers.filter((user) =>
    user.username
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const allTasks =
  normalUsers.flatMap((user) =>
    user.Tasks.map((task) => ({
      ...task,
      username: user.username,
    }))
  );

  const completedTasks =
  allTasks.filter(
    (task) => task.completed
  ).length;

  return (

    <div
      className={
        darkMode
        ? "bg-[#050505] text-white h-screen flex overflow-hidden"
        : "bg-gray-100 text-black h-screen flex overflow-hidden"
      }
    >

      {/* SIDEBAR */}

      <div
        className={
          darkMode
          ? "w-72 bg-[#0f0f0f] border-r border-gray-800 flex flex-col fixed left-0 top-0 h-screen p-6"
          : "w-72 bg-white border-r flex flex-col fixed left-0 top-0 h-screen p-6"
        }
      >

        <div className="flex items-center gap-3 mb-12">

          <Shield size={34} />

          <h1 className="text-3xl font-bold">
            Admin
          </h1>

        </div>

        <button
          onClick={() =>
            setActivePage("dashboard")
          }
          className={
            activePage === "dashboard"
            ? "flex items-center gap-3 bg-blue-600 p-4 rounded-2xl mb-4"
            : "flex items-center gap-3 hover:bg-gray-800 p-4 rounded-2xl mb-4 transition"
          }
        >
          <LayoutDashboard />
          Dashboard
        </button>

        <button
          onClick={() =>
            setActivePage("users")
          }
          className={
            activePage === "users"
            ? "flex items-center gap-3 bg-blue-600 p-4 rounded-2xl mb-4"
            : "flex items-center gap-3 hover:bg-gray-800 p-4 rounded-2xl mb-4 transition"
          }
        >
          <Users />
          Users
        </button>

        <button
          onClick={() =>
            setActivePage("tasks")
          }
          className={
            activePage === "tasks"
            ? "flex items-center gap-3 bg-blue-600 p-4 rounded-2xl mb-4"
            : "flex items-center gap-3 hover:bg-gray-800 p-4 rounded-2xl mb-4 transition"
          }
        >
          <ClipboardList />
          Tasks
        </button>

        <div className="mt-auto">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 p-4 rounded-2xl mb-4 transition"
          >

            {
              darkMode
              ? <Sun />
              : <Moon />
            }

            Theme

          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 p-4 rounded-2xl transition"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="ml-72 flex-1 overflow-y-auto p-10">

        {/* DASHBOARD */}

        {activePage === "dashboard" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Admin Dashboard
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[30px] shadow-2xl relative overflow-hidden">

                <div className="absolute right-5 top-5 opacity-20">
                  <Users size={90} />
                </div>

                <p className="text-lg opacity-80">
                  Total Users
                </p>

                <h2 className="text-6xl font-bold mt-5">
                  {normalUsers.length}
                </h2>

              </div>

              <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-[30px] shadow-2xl relative overflow-hidden">

                <div className="absolute right-5 top-5 opacity-20">
                  <CheckCircle2 size={90} />
                </div>

                <p className="text-lg opacity-80">
                  Completed Tasks
                </p>

                <h2 className="text-6xl font-bold mt-5">
                  {completedTasks}
                </h2>

              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-[30px] shadow-2xl relative overflow-hidden">

                <div className="absolute right-5 top-5 opacity-20">
                  <Activity size={90} />
                </div>

                <p className="text-lg opacity-80">
                  Total Tasks
                </p>

                <h2 className="text-6xl font-bold mt-5">
                  {allTasks.length}
                </h2>

              </div>

            </div>

          </div>

        )}

        {/* USERS */}

        {activePage === "users" && (

          <div>

            <div className="flex justify-between items-center mb-10">

              <h1 className="text-5xl font-bold">
                Users
              </h1>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="p-4 rounded-2xl text-black w-80 outline-none"
              />

            </div>

            <div className="grid gap-6">

              {filteredUsers.map((user) => (

                <div
                  key={user.id}
                  className={
                    darkMode
                    ? "bg-[#111111] border border-gray-800 rounded-[30px] p-6 hover:border-blue-500 transition"
                    : "bg-white rounded-[30px] p-6 shadow-lg"
                  }
                >

                  <div className="flex justify-between items-center flex-wrap gap-6">

                    <div className="flex items-center gap-5">

                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">

                        {
                          user.username
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

                      </div>

                      <div>

                        <h2 className="text-2xl font-bold mb-2">
                          {user.username}
                        </h2>

                        <div className="flex items-center gap-2 opacity-70 mb-2">
                          <Mail size={16} />
                          {user.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm">

                          <Clock3 size={15} />

                          {
                            user.blocked
                            ? "Blocked"
                            : "Active User"
                          }

                        </div>

                      </div>

                    </div>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          blockUser(user.id)
                        }
                        className={
                          user.blocked
                          ? "bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                          : "bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                        }
                      >

                        <Ban size={18} />

                        {
                          user.blocked
                          ? "Unblock"
                          : "Block"
                        }

                      </button>

                      <button
                        onClick={() =>
                          deleteUser(user.id)
                        }
                        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                      >

                        <Trash2 size={18} />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* TASKS */}

        {activePage === "tasks" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Tasks
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

              {allTasks.map((task) => (

                <div
                  key={task.id}
                  className={
                    darkMode
                    ? "bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-gray-800 rounded-[30px] p-7 hover:border-blue-500 transition"
                    : "bg-white rounded-[30px] p-7 shadow-lg"
                  }
                >

                  <div className="flex justify-between items-start mb-6">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">
                        {task.title}
                      </h2>

                      <p className="opacity-70 leading-relaxed">
                        {task.description}
                      </p>

                    </div>

                    <div
                      className={
                        task.completed
                        ? "bg-green-600 px-4 py-2 rounded-xl text-sm"
                        : "bg-yellow-600 px-4 py-2 rounded-xl text-sm"
                      }
                    >

                      {
                        task.completed
                        ? "Completed"
                        : "Pending"
                      }

                    </div>

                  </div>

                  <div className="border-t border-gray-700 pt-5 flex justify-between items-center">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">

                        {
                          task.username
                          ?.charAt(0)
                          ?.toUpperCase()
                        }

                      </div>

                      <div>

                        <p className="font-semibold">
                          {task.username}
                        </p>

                        <p className="text-sm opacity-60">
                          Task Creator
                        </p>

                      </div>

                    </div>

                    <div className="text-right text-sm opacity-60">

                      {
                        new Date(
                          task.createdAt
                        ).toLocaleString()
                      }

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminDashboard;