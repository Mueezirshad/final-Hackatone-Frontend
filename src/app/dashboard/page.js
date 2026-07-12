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

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const { data } = await api.get(
        "/analytics/dashboard"
      );

      setStats(data);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to load dashboard",
        background: "#1e293b",
        color: "#fff",
      });

    }
  };

  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
              Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-5">

              <StatCard
                title="Users"
                value={stats.totalUsers || 0}
              />

              <StatCard
                title="Assets"
                value={stats.totalAssets || 0}
              />

              <StatCard
                title="Issues"
                value={stats.totalIssues || 0}
              />

              <StatCard
                title="Open Issues"
                value={stats.openIssues || 0}
              />

              <StatCard
                title="Resolved"
                value={stats.resolvedIssues || 0}
              />

              <StatCard
                title="Maintenance"
                value={stats.totalMaintenance || 0}
              />

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}