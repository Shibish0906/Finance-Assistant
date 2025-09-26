"use client";

/**
 * Sidebar
 *
 * Application sidebar for the dashboard area. Renders navigation links and
 * quick actions (Add Transaction). Highlights the active route using
 * `usePathname`.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Settings, LogOut, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: List },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="group fixed left-0 top-0 h-full z-40">
      {/* Hover zone */}
      <div className="w-3 h-full bg-transparent group-hover:bg-transparent" />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-60 bg-white border-r shadow-sm flex flex-col justify-between",
          "transform -translate-x-full group-hover:translate-x-0",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        {/* Top: App name */}
        <div>
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">Finance Assistant</h1>
          </div>

          {/* Navigation */}
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Overview
            </h2>
            <nav className="space-y-2">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition",
                      isActive && "bg-blue-100 text-blue-700 font-medium"
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/dashboard/transactions/new"
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
              >
                <PlusCircle size={18} />
                Add Transaction
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom: Settings & Profile */}
        <div className="border-t px-6 py-4">
          <nav className="space-y-2">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Settings size={18} />
              Settings
            </Link>
            <button
              className="flex items-center gap-3 px-4 py-2 w-full rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              onClick={() => alert("Logout clicked")}
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
}
