"use client";

import { useEffect, useState } from "react";

import api from "../../services/api";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";

export default function SchedulePage() {

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {

        fetchSchedule();

    }, []);

    const fetchSchedule = async () => {

        const { data } = await api.get("/schedules");

        setSchedule(data.schedules);

    };

    return (

        <ProtectedRoute>

            <div className="flex">

                <Sidebar />

                <div className="flex-1">

                    <Navbar />

                    <div className="p-6">

                        <h1 className="text-3xl font-bold mb-6">

                            Schedule

                        </h1>

                        <div className="space-y-4">

                            {schedule.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-slate-800 rounded-lg p-5"
                                >

                                    <h2>

                                        {item.title}

                                    </h2>

                                    <p>

                                        {item.description}

                                    </p>

                                    <p>

                                        {new Date(item.maintenanceDate).toLocaleDateString()}

                                    </p>

                                    <span>

                                        {item.status}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </ProtectedRoute>

    );

}