"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../services/api";
import Sidebar from "../../../../components/sidebar";
import Navbar from "../../../../components/navbar";
import ProtectedRoute from "../../../../components/protectedRoute";
import Swal from "sweetalert2";

export default function EditAsset({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [formData, setFormData] = useState({
    assetName: "",
    category: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAsset();
  }, [id]);

  const loadAsset = async () => {
    try {
      const { data } = await api.get(`/assets/${id}`);
      setFormData({
        assetName: data.asset.assetName || "",
        category: data.asset.category || "",
        location: data.asset.location || "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load asset details",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

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
      await api.put(`/assets/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        background: "#1e293b",
        color: "#fff",
      });

      router.push("/assets");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update asset",
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
            <h1 className="text-3xl font-bold mb-6">Edit Asset</h1>

            <form
              onSubmit={handleSubmit}
              className="max-w-xl bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-5"
            >
              <div>
                <label className="block text-sm text-slate-300 mb-2">Asset Name</label>
                <input
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Category</label>
                <input
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Location</label>
                <input
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 transition-colors"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Update Asset"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}