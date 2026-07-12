"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";
import { FiCalendar, FiClock, FiCheckSquare, FiAlertCircle } from "react-icons/fi";

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/schedules");
      setSchedule(data.schedules || []);
    } catch (error) {
      console.error("Failed to load schedules", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#0b0f19] text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <div className="p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto">
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                <FiCalendar size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Schedule</h1>
                <p className="text-slate-400 text-sm mt-0.5">Upcoming scheduled preventive maintenance dates and repair tasks</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : schedule.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-16 text-center space-y-3">
                <div className="text-4xl">📆</div>
                <h3 className="text-lg font-bold text-slate-300">No Scheduled Maintenance</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">No preventive maintenance tasks are currently scheduled. Everything is running smoothly!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schedule.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="font-bold text-lg text-white">
                          {item.title}
                        </h2>
                        <span className={`inline-block border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-slate-800/50 pt-4 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <FiClock size={14} className="text-blue-400" />
                        <span>Date: {new Date(item.maintenanceDate).toLocaleDateString()}</span>
                      </div>
                      {item.asset ? (
                        <span className="text-[10px] text-slate-500 font-mono">Asset ID: {item.asset}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}