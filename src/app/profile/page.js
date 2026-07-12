"use client";

import { useAuth } from "../../context/authContext";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            <div className="max-w-xl bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center text-2xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                  <p className="text-slate-400 text-sm capitalize">{user?.role}</p>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-5 space-y-4">
                <div>
                  <label className="block text-sm text-slate-400">Full Name</label>
                  <p className="text-white text-lg font-medium mt-1">{user?.name}</p>
                </div>

                <div>
                  <label className="block text-sm text-slate-400">Email Address</label>
                  <p className="text-white text-lg font-medium mt-1">{user?.email}</p>
                </div>

                <div>
                  <label className="block text-sm text-slate-400">Role / Designation</label>
                  <p className="text-white text-lg font-medium mt-1 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}