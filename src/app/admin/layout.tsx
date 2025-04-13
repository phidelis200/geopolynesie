"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState, Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col">
        <div className="sticky top-0 z-10">
          <div className="bg-ocean-800 p-4 lg:hidden flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Géopolynésie Admin</h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white p-2 hover:bg-ocean-700 rounded-lg cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <main className="flex-1 p-4 lg:p-8">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
