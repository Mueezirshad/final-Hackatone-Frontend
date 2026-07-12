"use client";

import { FiTrendingUp, FiBox, FiAlertCircle, FiSettings, FiUser, FiCheckCircle } from "react-icons/fi";

export default function StatCard({ title, value }) {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case "users":
        return <FiUser size={18} className="text-indigo-400" />;
      case "assets":
        return <FiBox size={18} className="text-blue-400" />;
      case "issues":
        return <FiAlertCircle size={18} className="text-amber-400" />;
      case "open issues":
        return <FiAlertCircle size={18} className="text-rose-400" />;
      case "resolved":
        return <FiCheckCircle size={18} className="text-emerald-400" />;
      case "maintenance":
        return <FiSettings size={18} className="text-cyan-400" />;
      default:
        return <FiTrendingUp size={18} className="text-slate-400" />;
    }
  };

  const getBorderColor = () => {
    switch (title.toLowerCase()) {
      case "users":
        return "hover:border-indigo-500/40";
      case "assets":
        return "hover:border-blue-500/40";
      case "issues":
        return "hover:border-amber-500/40";
      case "open issues":
        return "hover:border-rose-500/40";
      case "resolved":
        return "hover:border-emerald-500/40";
      case "maintenance":
        return "hover:border-cyan-500/40";
      default:
        return "hover:border-slate-500/40";
    }
  };

  return (
    <div
      className={`bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800/80 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/10 hover:translate-y-[-2px] flex items-center justify-between group ${getBorderColor()}`}
    >
      <div className="space-y-2.5">
        <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {title}
        </h3>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </h2>
      </div>

      <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-850 group-hover:scale-105 transition-transform duration-300">
        {getIcon()}
      </div>
    </div>
  );
}