// Frontend/src/pages/AdminDashboard.tsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Search,
  Moon,
  Sun,
  Shield,
  LogOut,
  CheckCircle2,
  Clock3,
  Trash2,
  Ban,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

type UserType = {
  id: number;
  username: string;
  email: string;
  role: string;
  blocked: boolean;
};

type TaskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  UserId: number;
};

function AdminDashboard() {

  const navigate =
    useNavigate();

  const [users,
    setUsers] =
    useState<UserType[]>([]);

  const [tasks,
    setTasks] =
    useState<TaskType[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [darkMode,
    setDarkMode] =
    useState(true);

  const token =
    localStorage.getItem(
      "token"
    );

  const adminName =
    localStorage.getItem(
      "username"
    );

  const fetchData =
    async () => {

      try {

        const usersRes =
          await axios.get(
            "http://localhost:5000/api/admin/users",

            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        const tasksRes =
          await axios.get(
            "http://localhost:5000/api/admin/tasks",

            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setUsers(
          usersRes.data
        );

        setTasks(
          tasksRes.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchData();

  }, []);

  const deleteUser =
    async (id: number) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/admin/user/${id}`,

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  const blockUser =
    async (id: number) => {

      try {

        await axios.put(

          `http://localhost:5000/api/admin/block/${id}`,

          {},

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchData();

      } catch (error) {

        console.log(error);
      }
    };

  const logout =
    () => {

      localStorage.clear();

      navigate("/");
    };

  const filteredUsers =
    users.filter((user) =>

      user.username
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div
      className={`min-h-screen flex transition-all duration-500 ${
        darkMode
          ? "bg-[#020617] text-white"
          : "bg-[#f1f5f9] text-black"
      }`}
    >

      {/* SIDEBAR */}

      <div
        className={`w-72 fixed left-0 top-0 h-screen border-r flex flex-col justify-between p-6 transition-all duration-500 ${
          darkMode
            ? "bg-[#111827] border-gray-800"
            : "bg-white border-gray-300"
        }`}
      >

        <div>

          <div className="flex items-center gap-4 mb-12">

            <div className="bg-blue-600 p-4 rounded-3xl">

              <Shield
                size={30}
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">

                Admin Panel

              </h1>

              <p className="text-gray-400 text-sm">

                Control Center

              </p>

            </div>

          </div>

          <div className="space-y-4">

            <div className="bg-blue-600 text-white p-4 rounded-2xl flex items-center gap-4">

              <LayoutDashboard />

              Dashboard

            </div>

            <div className={`p-4 rounded-2xl flex items-center justify-between ${
              darkMode
                ? "bg-[#1e293b]"
                : "bg-gray-100"
            }`}>

              <div className="flex items-center gap-4">

                <Users />

                Users

              </div>

              <span className="font-bold">

                {users.length}

              </span>

            </div>

            <div className={`p-4 rounded-2xl flex items-center justify-between ${
              darkMode
                ? "bg-[#1e293b]"
                : "bg-gray-100"
            }`}>

              <div className="flex items-center gap-4">

                <ClipboardList />

                Tasks

              </div>

              <span className="font-bold">

                {tasks.length}

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
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
              darkMode
                ? "bg-[#1e293b]"
                : "bg-gray-100"
            }`}
          >

            {darkMode
              ? <Sun />
              : <Moon />}

            {darkMode
              ? "Light Mode"
              : "Dark Mode"}

          </button>

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition-all p-4 rounded-2xl flex items-center justify-center gap-3 text-white"
          >

            <LogOut />

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="ml-72 flex-1 p-8">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">

              Welcome,
              {" "}
              {adminName}
              👑

            </h1>

            <p className="text-gray-400 mt-2">

              Manage all users and tasks

            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="relative mb-10">

          <Search
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search users by username or email..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className={`w-full rounded-2xl py-4 pl-12 pr-4 outline-none transition-all ${
              darkMode
                ? "bg-[#111827]"
                : "bg-white"
            }`}
          />

        </div>

        {/* USER CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredUsers.map(
            (user) => {

              const userTasks =
                tasks.filter(
                  (task) =>
                    task.UserId ===
                    user.id
                );

              return (

                <div
                  key={user.id}
                  className={`rounded-3xl p-6 transition-all shadow-xl ${
                    darkMode
                      ? "bg-[#111827]"
                      : "bg-white"
                  }`}
                >

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <h2 className="text-2xl font-bold">

                        {user.username}

                      </h2>

                      <p className="text-gray-400 text-sm mt-1">

                        {user.email}

                      </p>

                    </div>

                    <span className={`px-4 py-1 rounded-full text-sm text-white ${
                      user.role ===
                      "admin"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}>

                      {user.role}

                    </span>

                  </div>

                  {user.blocked && (

                    <div className="bg-red-600 text-white text-center py-2 rounded-xl mb-5">

                      User Blocked

                    </div>
                  )}

                  <div className="flex gap-3 mb-6">

                    <button
                      onClick={() =>
                        blockUser(
                          user.id
                        )
                      }
                      className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 text-white transition-all ${
                        user.blocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                    >

                      <Ban size={18} />

                      {user.blocked
                        ? "Unblock"
                        : "Block"}

                    </button>

                    <button
                      onClick={() =>
                        deleteUser(
                          user.id
                        )
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl flex items-center justify-center gap-2 text-white transition-all"
                    >

                      <Trash2
                        size={18}
                      />

                      Delete

                    </button>

                  </div>

                  <div className="space-y-4">

                    {userTasks.length ===
                    0 ? (

                      <div className={`rounded-2xl p-4 text-center ${
                        darkMode
                          ? "bg-[#1e293b]"
                          : "bg-gray-100"
                      }`}>

                        No tasks available

                      </div>

                    ) : (

                      userTasks.map(
                        (task) => (

                          <div
                            key={task.id}
                            className={`rounded-2xl p-4 ${
                              darkMode
                                ? "bg-[#1e293b]"
                                : "bg-gray-100"
                            }`}
                          >

                            <div className="flex justify-between">

                              <div>

                                <h3 className="font-bold text-lg">

                                  {task.title}

                                </h3>

                                <p className="text-sm text-gray-400 mt-1">

                                  {task.description}

                                </p>

                              </div>

                              {task.completed ? (

                                <CheckCircle2 className="text-green-500" />

                              ) : (

                                <Clock3 className="text-yellow-500" />

                              )}

                            </div>

                          </div>
                        )
                      )
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;