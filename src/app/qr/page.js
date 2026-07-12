"use client";

import { useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import Swal from "sweetalert2";

export default function QRPage() {
  const [id, setId] = useState("");
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!id.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing ID",
        text: "Please enter an Asset ID",
        background: "#1e293b",
        color: "#fff",
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get(`/qr/${id}`);
      setQr(data.qr);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "QR Error",
        text: "Asset Not Found or server error",
        background: "#1e293b",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">QR Generator</h1>

            <div className="max-w-xl bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-slate-300">Asset ID</label>
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter Asset ID"
                  className="w-full bg-slate-700 border border-slate-600 focus:border-blue-500 rounded-lg px-4 py-3 text-white transition-all duration-300"
                />
              </div>

              <button
                onClick={generateQR}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate QR Code"}
              </button>

              {qr && (
                <div className="flex flex-col items-center gap-3 pt-6 border-t border-slate-700">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                      src={qr}
                      alt="QR Code"
                      className="w-60 h-60 object-contain"
                    />
                  </div>
                  <p className="text-sm text-slate-400">Scan this code to view asset details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}