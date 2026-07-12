"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";
import { FiBell, FiInfo, FiCalendar, FiClock } from "react-icons/fi";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to load notifications", error);
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
          <div className="p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                <FiBell size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Notifications</h1>
                <p className="text-slate-400 text-sm mt-0.5">Real-time alerts, assignment notifications, and scheduled updates</p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-16 text-center space-y-3">
                <div className="text-4xl">🔔</div>
                <h3 className="text-lg font-bold text-slate-300">All Caught Up</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">No new notifications to show. We will alert you here if there are any new issues reported or maintenance logs created.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md flex items-start gap-4 hover:border-slate-700 transition-all duration-200"
                  >
                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 shrink-0 mt-0.5">
                      <FiInfo size={16} />
                    </div>
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h2 className="font-bold text-base text-slate-100">
                          {item.title}
                        </h2>
                        {item.createdAt && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                            <FiClock size={10} />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.message}
                      </p>
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