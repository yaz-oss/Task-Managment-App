import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  LogOut,
  Shield,
  User,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <aside className="w-72 bg-indigo-700 text-white p-6 flex flex-col shadow-2xl">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            TaskFlow
          </h1>

          <button className="flex items-center gap-3 bg-white text-indigo-700 w-full px-4 py-4 rounded-2xl font-semibold">

            <LayoutDashboard size={22} />

            Dashboard

          </button>

        </div>

        <button
          onClick={logout}
          className="mt-auto bg-red-500 hover:bg-red-600 transition-all py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
        >

          <LogOut size={20} />

          Logout

        </button>

      </aside>

      <main className="flex-1 p-10">

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome {user.username}
          </h1>

          <p className="text-gray-500 mb-8">
            Your account information
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-indigo-50 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-4">

                <User
                  className="text-indigo-600"
                  size={24}
                />

                <h2 className="text-2xl font-semibold">
                  User Info
                </h2>

              </div>

              <p className="text-gray-700 mb-2">
                Username:
                <span className="font-semibold ml-2">
                  {user.username}
                </span>
              </p>

              <p className="text-gray-700">
                Email:
                <span className="font-semibold ml-2">
                  {user.email}
                </span>
              </p>

            </div>

            <div className="bg-purple-50 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-4">

                <Shield
                  className="text-purple-600"
                  size={24}
                />

                <h2 className="text-2xl font-semibold">
                  Role
                </h2>

              </div>

              <p className="text-gray-700 text-xl font-bold capitalize">
                {user.role}
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;