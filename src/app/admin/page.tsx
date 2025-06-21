"use client"

import type React from "react"
import { useState } from "react"
import { LayoutDashboard, ShoppingBag, Coffee, Settings, Gift, Menu } from "lucide-react"

import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminOrders from "@/components/admin/admin-orders"
import AdminProfile from "@/components/admin/admin-profile"
import AdminCashier from "@/components/admin/admin-cashier"
import AdminRedemptions from "@/components/admin/admin-redemptions"
import AdminMenu from "@/components/admin/admin-menu"
import AdminLogin from "@/app/(admin)/components/admin-login"
import AdminSidebar from "@/app/(admin)/components/admin-sidebar"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useToast } from "@/hooks/use-toast"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "Menu",
    icon: Menu,
    id: "menu",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    id: "orders",
  },
  {
    title: "Cashier",
    icon: Coffee,
    id: "cashier",
  },
  {
    title: "Redemptions",
    icon: Gift,
    id: "redemptions",
  },
  {
    title: "Profile",
    icon: Settings,
    id: "profile",
  },
]

export default function AdminPage() {
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("dashboard")
    toast({
      variant: "success",
      title: "Logged Out Successfully",
      description: "You have been logged out from the admin panel",
    })
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          handleLogout={handleLogout}
          menuItems={menuItems}
        />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-[#2563eb]">
                {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "menu" && <AdminMenu />}
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "cashier" && <AdminCashier />}
            {activeTab === "redemptions" && <AdminRedemptions />}
            {activeTab === "profile" && <AdminProfile onLogout={handleLogout} />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
