"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";
import { FiTool, FiDollarSign, FiUser, FiFileText } from "react-icons/fi";

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/maintenance");
      setMaintenances(data.maintenances || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load maintenance logs",
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
          <div className="p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto">
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                <FiTool size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Maintenance</h1>
                <p className="text-slate-400 text-sm mt-0.5">Logs of technicians, costs, and actions completed for resolved issues</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : maintenances.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-16 text-center space-y-3">
                <div className="text-4xl">🛠️</div>
                <h3 className="text-lg font-bold text-slate-300">No Maintenance Logs</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">There are currently no maintenance actions logged. Active issues require a technician diagnosis to begin logging maintenance history.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {maintenances.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4 hover:border-slate-700 transition-all duration-200"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                        Log Reference
                      </span>
                      <h2 className="text-lg font-bold text-white mt-1.5 leading-snug">
                        {item.issue?.title || "Untitled Action"}
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm border-t border-b border-slate-800/60 py-3.5">
                      <div className="flex items-center gap-2">
                        <FiUser size={16} className="text-slate-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Technician</span>
                          <span className="text-slate-200 font-medium text-xs">{item.technician?.name || "Unassigned"}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiDollarSign size={16} className="text-slate-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Expenses</span>
                          <span className="text-slate-200 font-medium text-xs">{item.cost ? `$${item.cost}` : "Free"}</span>
                        </div>
                      </div>
                    </div>

                    {item.notes && (
                      <div className="space-y-1.5">
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                          <FiFileText size={12} />
                          Resolution Notes
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/30 p-3 rounded-xl border border-slate-850">
                          {item.notes}
                        </p>
                      </div>
                    )}
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