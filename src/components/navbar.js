"use client";

import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout, toggleSidebar } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      background: "#0f172a",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        router.push("/login");
      }
    });
  };

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/80 h-16 px-6 flex items-center justify-between border-b border-slate-800/80 shadow-sm shadow-slate-950/20">
      
      {/* Left side items */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <FiMenu size={22} />
        </button>
        <span className="md:hidden font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          MaintainIQ
        </span>
      </div>

      {/* Right side profile / action panel */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
          <FiUser size={14} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">
            {user?.name || "User"}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {user?.role || "guest"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white px-3.5 py-1.5 rounded-full border border-red-500/20 hover:border-red-600 text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          <FiLogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

    </nav>
  );
}