"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import DeleteButton from "../../components/deleteButton";
import Swal from "sweetalert2";
import { FiBox, FiPlus, FiMapPin, FiGrid } from "react-icons/fi";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/assets");
      setAssets(data.assets || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to load assets from server",
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
            
            {/* Header section with add button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
                  <FiBox size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Assets</h1>
                  <p className="text-slate-400 text-sm mt-0.5">Manage and track your hardware and equipment inventories</p>
                </div>
              </div>
              <Link
                href="/assets/add"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-500/10 cursor-pointer text-sm"
              >
                <FiPlus size={18} />
                Add Asset
              </Link>
            </div>

            {/* Content area */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : assets.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-16 text-center space-y-3">
                <div className="text-4xl">📦</div>
                <h3 className="text-lg font-bold text-slate-300">No Assets Available</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Get started by adding your first equipment, machine, or hardware to the inventory tracking system.</p>
                <Link
                  href="/assets/add"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all mt-2"
                >
                  Add First Asset
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <div
                    key={asset._id}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {asset.assetName}
                        </h2>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {asset.category || "General"}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-slate-300 border-t border-slate-800/50 pt-3">
                        <p className="flex items-center gap-2 font-mono text-xs text-slate-400">
                          <span className="font-semibold">Code:</span> {asset.assetCode || "N/A"}
                        </p>
                        <p className="flex items-center gap-2 text-xs">
                          <FiMapPin size={14} className="text-slate-400" />
                          <span className="font-semibold text-slate-400">Location:</span> {asset.location || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800/50">
                      <Link
                        href={`/assets/edit/${asset._id}`}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-center flex-1 transition-all flex items-center justify-center border border-slate-700 hover:border-slate-600"
                      >
                        Edit Details
                      </Link>
                      <div className="flex-1">
                        <DeleteButton
                          id={asset._id}
                          refresh={getAssets}
                        />
                      </div>
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