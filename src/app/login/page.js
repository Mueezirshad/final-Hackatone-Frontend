"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import api from "../../services/api";
import { useAuth } from "../../context/authContext";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuickLogin = (role) => {
    if (role === "admin") {
      setFormData({
        email: "admin@test.com",
        password: "password123",
      });
    } else if (role === "technician") {
      setFormData({
        email: "tech@test.com",
        password: "password123",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      login(data.user, data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        background: "#1e293b",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong",
        background: "#1e293b",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
  <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🔧
          </div>

          <h1 className="text-3xl font-bold text-white">
            MaintainIQ
          </h1>

          <p className="text-slate-400 mt-2">
            Asset Maintenance Management System
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg px-4 py-3 text-white transition-all duration-300"
              required
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg px-4 py-3 text-white transition-all duration-300"
              required
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="mt-8 pt-5 border-t border-slate-700 text-center">

          <p className="text-slate-500 text-sm">
            Login as{" "}
            <span
              onClick={() => handleQuickLogin("admin")}
              className="text-blue-400 cursor-pointer hover:underline hover:text-blue-300 transition-all font-semibold"
            >
              Admin
            </span>{" "}
            or{" "}
            <span
              onClick={() => handleQuickLogin("technician")}
              className="text-green-400 cursor-pointer hover:underline hover:text-green-300 transition-all font-semibold"
            >
              Technician
            </span>
          </p>

        </div>

      </div>

    </div>

  </div>

  );
}