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
  {/* Pure Dashboard Wrapper */}
  <div className="flex min-h-screen bg-[#090d16] font-sans antialiased text-slate-200">
    
    {/* Sidebar Component */}
    <Sidebar />
    
    {/* Right Content Section - Forcing structural padding */}
    <div className="flex-1 flex flex-col min-w-0 w-full pl-6 pr-8 md:pl-10 md:pr-12 lg:pl-12 lg:pr-16">
      
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Container - Controlled Maximum Width with precise centering */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto py-10 space-y-12">
        
        {/* Premium Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-800/60 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              System analytics and live operations metrics overview
            </p>
          </div>
          
          {/* Real Premium Button - Large & Slick */}
          <button className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.2)] cursor-pointer">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            Synchronize Real-Time Metrics
          </button>
        </div>

        {/* Loading / Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          /* 
            Premium Layout Injector: 
            Instead of relying on the black box inside <StatCard />, we wrap them 
            into custom modern glass containers directly from here.
          */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            
            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Users" value={stats.totalUsers || 0} />
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Assets" value={stats.totalAssets || 0} />
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Issues" value={stats.totalIssues || 0} />
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-rose-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Open Issues" value={stats.openIssues || 0} />
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Resolved" value={stats.resolvedIssues || 0} />
            </div>

            <div className="bg-[#121723]/80 backdrop-blur-md border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl group">
              <StatCard title="Maintenance" value={stats.totalMaintenance || 0} />
            </div>

          </div>
        )}

      </main>
    </div>
  </div>
</ProtectedRoute>


  );
}