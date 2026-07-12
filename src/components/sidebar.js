"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/authContext";
import {
  FiGrid,
  FiBox,
  FiAlertCircle,
  FiTool,
  FiCalendar,
  FiBell,
  FiPlusSquare,
  FiFileText,
  FiX,
  FiUser
} from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiGrid },
    { name: "Assets", href: "/assets", icon: FiBox },
    { name: "Issues", href: "/issues", icon: FiAlertCircle },
    { name: "Maintenance", href: "/maintenance", icon: FiTool },
    { name: "Schedule", href: "/schedule", icon: FiCalendar },
    { name: "Notifications", href: "/notifications", icon: FiBell },
    { name: "Add Asset", href: "/assets/add", icon: FiPlusSquare },
    { name: "Report Issue", href: "/issues/add", icon: FiFileText },
    { name: "QR Generator", href: "/qr", icon: BsQrCode },
    { name: "Profile", href: "/profile", icon: FiUser },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800/80 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <span className="font-extrabold text-xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              MaintainIQ
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (sidebarOpen) toggleSidebar();
                }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-500/10 border border-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Spacer for desktop layout grid positioning */}
      <div className="w-64 hidden md:block shrink-0" />
    </>
  );
}