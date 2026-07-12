"use client";

import { useEffect, useState } from "react";

import api from "../../services/api";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";

import Swal from "sweetalert2";

export default function MaintenancePage() {

    const [maintenances, setMaintenances] = useState([]);

    useEffect(() => {

        fetchMaintenances();

    }, []);

    const fetchMaintenances = async () => {

        try {

            const { data } = await api.get("/maintenance");

            setMaintenances(data.maintenances);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load maintenance",
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

                            Maintenance

                        </h1>

                        <div className="space-y-5">

                            {maintenances.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-slate-800 rounded-lg p-5"
                                >

                                    <h2 className="text-xl font-bold">

                                        {item.issue?.title}

                                    </h2>

                                    <p>

                                        Technician :
                                        {" "}
                                        {item.technician?.name}

                                    </p>

                                    <p>

                                        Cost :
                                        {" "}
                                        {item.cost}

                                    </p>

                                    <p>

                                        {item.notes}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </ProtectedRoute>

    );

}