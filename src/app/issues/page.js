"use client";

import { useEffect, useState } from "react";

import api from "../../services/api";
import AIButton from "../../components/aiButton";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import ProtectedRoute from "../../components/protectedRoute";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {

    const { data } = await api.get("/issues");

    setIssues(data.issues);

  };

  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
              Issues
            </h1>

            <div className="space-y-4">

              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-slate-800 p-5 rounded-lg border border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="font-bold text-xl text-white">
                      {issue.title}
                    </h2>
                    <p className="mt-2 text-slate-300">
                      {issue.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-slate-700/50 pt-4">
                    <span className="inline-block bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded text-sm font-semibold">
                      {issue.status}
                    </span>
                    <AIButton description={issue.description} />
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