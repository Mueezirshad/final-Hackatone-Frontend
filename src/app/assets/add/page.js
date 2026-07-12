"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import api from "../../../services/api";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import ProtectedRoute from "../../../components/protectedRoute";

export default function AddAssetPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        assetName: "",
        assetCode: "",
        category: "",
        location: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
    });

    const [image, setImage] = useState(null);

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

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (image) {
                data.append("image", image);
            }

            await api.post("/assets", data);

            Swal.fire({
                icon: "success",
                title: "Asset Added",
                background: "#1e293b",
                color: "#fff",
            });

            router.push("/assets");

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.response?.data?.message,
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

                        <form
                            onSubmit={handleSubmit}
                            className="max-w-2xl space-y-4"
                        >

                            <input
                                name="assetName"
                                placeholder="Asset Name"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="assetCode"
                                placeholder="Asset Code"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="category"
                                placeholder="Category"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="location"
                                placeholder="Location"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="manufacturer"
                                placeholder="Manufacturer"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="model"
                                placeholder="Model"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                name="serialNumber"
                                placeholder="Serial Number"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                                className="w-full"
                            />

                            <button
                                disabled={loading}
                                className="bg-blue-600 px-8 py-3 rounded"
                            >
                                {loading ? "Saving..." : "Save Asset"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </ProtectedRoute>

    );

}