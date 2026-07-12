"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "../../services/api";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";
import DeleteButton from "../../components/deleteButton";

import Swal from "sweetalert2";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    try {

      const { data } = await api.get("/assets");

      setAssets(data.assets);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to load assets",
        background: "#1e293b",
        color: "#fff",
      });

    }
  };

  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
              Assets
            </h1>

            <div className="grid md:grid-cols-3 gap-5">

              {assets.map((asset) => (
                <div
                  key={asset._id}
                  className="bg-slate-800 p-5 rounded-lg border border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {asset.assetName}
                    </h2>
                    <p className="mt-2 text-slate-400 font-mono text-sm">
                      Code: {asset.assetCode}
                    </p>
                    <p className="text-slate-300 mt-1">
                      Location: {asset.location}
                    </p>
                    <p className="text-slate-300">
                      Category: {asset.category}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-5 pt-3 border-t border-slate-700/50">
                    <Link
                      href={`/assets/edit/${asset._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm text-center flex-1 transition-all flex items-center justify-center font-medium"
                    >
                      Edit
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

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}