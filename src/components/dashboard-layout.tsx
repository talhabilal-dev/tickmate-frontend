"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Ticket, Settings, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import UserDialog from "./admin/user-details-modal";

import { UserType } from "@/types";
import { UserMenu } from "./profile-modal";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Tickets", href: "/dashboard/tickets", icon: Ticket },
    {
      name: "Assigned Tickets",
      href: "/dashboard/assigned-tickets",
      icon: Ticket,
    },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const logout = async () => {
    try {
      const res = await apiFetch("/auth/logout", {
        method: "POST",
      });

      if (res.success) {
        toast.success("✅ Signed out successfully!");
        router.push("/auth");
      }

      if (!res.success) {
        toast.error("❌ Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("API error while signing out:", error);
      toast.error("🚨 An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await apiFetch("/auth/user", {
        method: "GET",
      });

      if (!res.success) {
        router.push("/auth");
      }

      if (res.success) {
        setUser(res.user);
      }
    };

    getUser();
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-zinc-900/80 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                  TicketMatch
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeSidebar}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-zinc-800">
                <Button
                  variant="destructive"
                  onClick={() => {
                    closeSidebar();
                    logout();
                  }}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-zinc-900 border-r border-zinc-800">
          <div className="flex items-center px-4 py-6 border-b border-zinc-800">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              TicketMatch
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-zinc-800">
            <Button variant="destructive" onClick={logout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
          <div className="flex items-center justify-between px-4 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {user?.role === "admin" && (
              <Button
                onClick={() => router.push("/admin")}
                variant="ghost"
                className="text-zinc-800 bg-zinc-200 hover:text-white hover:bg-zinc-900"
              >
                Admin Dashboard
              </Button>
            )}

            <div className="flex items-center space-x-4">
              <UserMenu
                currentUser={user}
                users={[user] as UserType[]}
                onLogout={logout}
                onViewProfile={(user) => {
                  if (!user) {
                    setUser(null);
                    setSelectedUser(null);
                    return;
                  }

                  setSelectedUser(user);

                  setUser(user ?? null);
                }}
              />
            </div>
          </div>
        </div>
        <UserDialog
          selectedUser={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
