import { FaTruckFast } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔥 check login state
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("trackly-user"));
    setUser(loggedUser);
  }, []);

  const handleGetStarted = () => {
    if (!user) {
      navigate("/signup");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "driver") {
      navigate("/driver");
    } else {
      navigate("/customer");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("trackly-user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-md bg-white/5 border-b border-white/10">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <FaTruckFast className="text-cyan-400 text-2xl" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Trackly
          </h1>
        </div>

        {/* LINKS */}
        <div className="space-x-4 flex items-center">

          <a href="#services" className="text-white/70 hover:text-white transition">
            Services
          </a>

          <a href="#about" className="text-white/70 hover:text-white transition">
            About
          </a>

          {/* 🔥 AUTH UI */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-green-600 hover:scale-105 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  if (user.role === "admin") navigate("/admin");
                  else if (user.role === "driver") navigate("/driver");
                  else navigate("/customer");
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:scale-105 transition"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-28 px-6 relative">

        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Smart Logistics <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h2>

        <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto">
          Track shipments, manage drivers, and deliver faster with real-time logistics intelligence.
        </p>

        <button
          onClick={handleGetStarted}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold hover:scale-110 transition"
        >
          Get Started
        </button>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-8 text-center">
        <h3 className="text-3xl font-bold mb-6">About Trackly</h3>
        <p className="text-white/60 max-w-3xl mx-auto">
          Trackly is a smart logistics management system designed to simplify shipment tracking, driver coordination, and delivery management in real time.
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-8">
        <h3 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Parcel Delivery",
              desc: "Fast and secure shipment handling system.",
              icon: "📦",
            },
            {
              title: "Fleet Management",
              desc: "Manage drivers and vehicles efficiently.",
              icon: "🚚",
            },
            {
              title: "Live Tracking",
              desc: "Real-time GPS tracking of deliveries.",
              icon: "📍",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition"
            >
              <div className="text-3xl">{item.icon}</div>
              <h4 className="text-xl font-bold mt-3">{item.title}</h4>
              <p className="text-white/60 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-white/10 text-white/50">
        © 2026 Trackly. Built for modern logistics.
      </footer>
    </div>
  );
}