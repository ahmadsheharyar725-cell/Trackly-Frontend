import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTruckFast, FaBars } from "react-icons/fa6";

export default function DashboardLayout({ title, role, children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("trackly-user"));
    setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("trackly-user");
    navigate("/");
  };

  // Sidebar menu based on role
  const menuItems = {
    customer: [
      { name: "Dashboard", path: "/customer" },
    ],
    driver: [
      { name: "Dashboard", path: "/driver" },
    ],
    admin: [
      { name: "Dashboard", path: "/admin" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">

      {/* SIDEBAR - DESKTOP */}
      <div className="hidden md:flex w-64 flex-col bg-white/5 border-r border-white/10 p-5">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8">
          <FaTruckFast className="text-cyan-400 text-2xl" />
          <h1 className="text-xl font-bold text-cyan-300">Trackly</h1>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3 flex-1">

          {menuItems[role]?.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              {item.name}
            </button>
          ))}

        </div>

        {/* USER */}
        <div className="border-t border-white/10 pt-4">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-white/60 capitalize">{role}</p>

          <button
            onClick={handleLogout}
            className="mt-3 w-full px-3 py-2 bg-red-600 rounded-lg text-sm hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>

          <h2 className="text-lg md:text-2xl font-bold">{title}</h2>

          <p className="text-sm text-white/60 hidden md:block">
            {user?.name}
          </p>
        </div>

        {/* MOBILE SIDEBAR */}
        {sidebarOpen && (
          <div className="md:hidden bg-white/10 border-b border-white/10 p-4 flex flex-col gap-3">

            {menuItems[role]?.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="px-3 py-2 rounded-lg hover:bg-white/10 text-left"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6 flex-1 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}