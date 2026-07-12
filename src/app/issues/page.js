"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import AIButton from "../../components/aiButton";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";
import { FiAlertCircle, FiPlus, FiArrowRight } from "react-icons/fi";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/issues");
      setIssues(data.issues || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load issues",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "in-progress":
      case "in progress":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
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
            
            {/* Header section with add button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                  <FiAlertCircle size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Issues</h1>
                  <p className="text-slate-400 text-sm mt-0.5">Track, triage, and manage asset technical issues and repair requests</p>
                </div>
              </div>
              <Link
                href="/issues/add"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-500/10 cursor-pointer text-sm"
              >
                <FiPlus size={18} />
                Report Issue
              </Link>
            </div>

            {/* Content area */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : issues.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-16 text-center space-y-3">
                <div className="text-4xl">⚠️</div>
                <h3 className="text-lg font-bold text-slate-300">No Issues Reported</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">System is running cleanly! No hardware faults, breakdowns, or repair requests reported currently.</p>
                <Link
                  href="/issues/add"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all mt-2"
                >
                  Report First Issue
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {issues.map((issue) => (
                  <div
                    key={issue._id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="font-bold text-lg text-white">
                          {issue.title}
                        </h2>
                        <span className={`inline-block border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-full ${getStatusStyle(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {issue.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-slate-800/50 pt-4">
                      {issue.asset ? (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Asset ID: {typeof issue.asset === 'object' ? (issue.asset._id || 'N/A') : issue.asset}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">No Asset Linked</span>
                      )}
                      <AIButton description={issue.description} />
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