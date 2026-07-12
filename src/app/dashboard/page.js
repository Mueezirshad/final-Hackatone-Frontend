"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import ProtectedRoute from "../../components/protectedRoute";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import StatCard from "../../components/statCard";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/analytics/dashboard");
      setStats(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to load dashboard statistics",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#0b0f19] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <div className="p-6 md:p-8 space-y-6 max-w-6xl w-full mx-auto">
            
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
              <p className="text-slate-400 text-sm mt-0.5">Real-time overview of system analytics and operations</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Users" value={stats.totalUsers || 0} />
                <StatCard title="Assets" value={stats.totalAssets || 0} />
                <StatCard title="Issues" value={stats.totalIssues || 0} />
                <StatCard title="Open Issues" value={stats.openIssues || 0} />
                <StatCard title="Resolved" value={stats.resolvedIssues || 0} />
                <StatCard title="Maintenance" value={stats.totalMaintenance || 0} />
              </div>
            )}

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}