"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Tableau de bord",
    },
    { path: "/admin/news", icon: Newspaper, label: "Actualités" },
    { path: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
    { path: "/admin/settings", icon: Settings, label: "Paramètres" },
  ];

  const onLogout = async () => {
    // Clear cookies or any session data
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
        .then((res) => {
          router.push("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:translate-x-0
          w-64 bg-ocean-800 text-white
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-ocean-700">
            <div>
              <h1 className="text-2xl font-bold">Géopolynésie</h1>
              <p className="text-ocean-200 text-sm">Administration</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-ocean-700 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-ocean-700 text-white"
                    : "text-ocean-100 hover:bg-ocean-700 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-ocean-700">
            <button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-ocean-100 hover:bg-ocean-700 hover:text-white cursor-pointer"
              onClick={onLogout}
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
