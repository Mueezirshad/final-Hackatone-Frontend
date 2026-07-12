"use client";

import { useEffect, useState } from "react";

import api from "../../services/api";

import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";

export default function NotificationsPage() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        const { data } = await api.get("/notifications");

        setNotifications(data.notifications);

    };

    return (

        <ProtectedRoute>

            <div className="flex">

                <Sidebar />

                <div className="flex-1">

                    <Navbar />

                    <div className="p-6">

                        <h1 className="text-3xl font-bold mb-6">

                            Notifications

                        </h1>

                        <div className="space-y-4">

                            {notifications.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-slate-800 rounded-lg p-5"
                                >

                                    <h2 className="font-bold">

                                        {item.title}

                                    </h2>

                                    <p>

                                        {item.message}

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