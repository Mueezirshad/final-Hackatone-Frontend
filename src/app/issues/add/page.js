"use client";

import { useState } from "react";
import api from "../../../services/api";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import ProtectedRoute from "../../../components/protectedRoute";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddIssue() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    asset: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/issues", formData);

      Swal.fire({
        icon: "success",
        title: "Issue Created",
        background: "#1e293b",
        color: "#fff",
      });

      router.push("/issues");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to create issue",
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
            <h1 className="text-3xl font-bold mb-6">Report Issue</h1>

            <form
              onSubmit={handleSubmit}
              className="max-w-xl bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-5"
            >
              <div>
                <label className="block text-sm text-slate-300 mb-2">Title</label>
                <input
                  placeholder="Issue Title"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Description</label>
                <textarea
                  placeholder="Provide a detailed description of the issue"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors min-h-[120px]"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Asset ID</label>
                <input
                  placeholder="Enter the ID of the affected Asset"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors"
                  name="asset"
                  value={formData.asset}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Issue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}