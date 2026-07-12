"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-700">

            <div className="text-center py-6 text-2xl font-bold">
                MaintainIQ
            </div>

            <nav className="flex flex-col">

                <Link
                    href="/dashboard"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Dashboard
                </Link>

                <Link
                    href="/assets"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Assets
                </Link>

                <Link
                    href="/issues"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Issues
                </Link>

                <Link
                    href="/maintenance"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Maintenance
                </Link>

                <Link
                    href="/schedule"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Schedule
                </Link>

                <Link
                    href="/notifications"
                    className="px-6 py-4 hover:bg-slate-800"
                >
                    Notifications
                </Link>
                
                <Link href="/assets/add" className="px-6 py-4 hover:bg-slate-800">
                    Add Asset
                </Link>

                <Link href="/issues/add" className="px-6 py-4 hover:bg-slate-800">
                    Report Issue
                </Link>

                <Link href="/qr" className="px-6 py-4 hover:bg-slate-800">
                    QR Generator
                </Link>

            </nav>

        </aside>
    );
}