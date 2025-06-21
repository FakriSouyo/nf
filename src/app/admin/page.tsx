"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

import { LayoutDashboard, ShoppingBag, Coffee, Settings, LogOut, Gift } from "lucide-react"

import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminOrders from "@/components/admin/admin-orders"
import AdminProfile from "@/components/admin/admin-profile"
import AdminCashier from "@/components/admin/admin-cashier"
import AdminRedemptions from "@/components/admin/admin-redemptions"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
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

function AdminSidebar({ activeTab, setActiveTab, handleLogout }: any) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Image src="/cat-mascot.png" alt="Admin Cat" width={40} height={40} className="w-10 h-10" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-[#2563eb]">Nefo Admin</h2>
            <p className="text-sm text-gray-600">Management Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveTab(item.id)}
                isActive={activeTab === item.id}
                className="w-full justify-start"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="w-full justify-start text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default function AdminPage() {
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email === "admin@nefocoffee.com" && loginForm.password === "admin123") {
      setIsLoggedIn(true)
      toast({
        variant: "success",
        title: "Login Successful!",
        description: "Welcome to Nefo Coffee Admin Panel",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("dashboard")
    setLoginForm({ email: "", password: "" })
    toast({
      variant: "success",
      title: "Logged Out Successfully",
      description: "You have been logged out from the admin panel",
    })
  }

  const isFormValid = loginForm.email.trim() !== "" && loginForm.password.trim() !== ""

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Image src="/cat-mascot.png" alt="Admin Cat" width={80} height={80} className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-[#2563eb] mb-2">Admin Login</h1>
              <p className="text-gray-600">Welcome to Nefo Coffee Admin Panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@nefocoffee.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter your password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login to Admin Panel
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Demo Credentials:</h3>
              <p className="text-sm text-gray-600">Email: admin@nefocoffee.com</p>
              <p className="text-sm text-gray-600">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
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
            {activeTab === "orders" && <AdminOrders />}
            {activeTab === "cashier" && <AdminCashier />}
            {activeTab === "redemptions" && <AdminRedemptions />}
            {activeTab === "profile" && <AdminProfile />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
