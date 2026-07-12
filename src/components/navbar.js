"use client";

import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      background: "#1e293b",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        router.push("/login");
      }
    });
  };

  return (
    <nav className="bg-slate-800 h-16 px-6 flex items-center justify-between border-b border-slate-700">

      <h1 className="text-2xl font-bold">
        MaintainIQ
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-sm">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}