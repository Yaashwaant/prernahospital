"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image, Building2, LogOut } from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Updates",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/hero-slider",
    label: "Hero Slider",
    icon: Image,
  },
  {
    href: "/admin/facilities-slider",
    label: "Facilities Slider",
    icon: Building2,
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  return (
    <aside className="flex h-full w-56 flex-col border-r border-gray-100 bg-white px-4 py-6 shadow-sm">
      {/* Brand */}
      <div className="mb-8 px-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F4FD8]">
          Prerna Hospital
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">Admin Portal</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1F4FD8]/10 text-[#1F4FD8]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#1F4FD8]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Logout
      </button>
    </aside>
  );
}
