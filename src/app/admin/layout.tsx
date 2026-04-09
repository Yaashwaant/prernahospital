"use client";

import { usePathname } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login" || pathname === "/admin";
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      const auth = localStorage.getItem("isAdminAuthenticated");
      if (!auth) {
        router.push("/admin/login");
        return;
      }
    }
    setReady(true);
  }, [isLogin, router]);

  if (!ready) return null;

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7]">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7FB]">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}