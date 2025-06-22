"use client"

import type React from "react"
import { useState } from "react"
import { LayoutDashboard, ShoppingBag, Coffee, Settings, Gift, Menu, Search, Filter, ChevronDown, ListFilter, Clock, CheckCircle, XCircle, Loader2, Plus, Eye, EyeOff, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  
  // Shared state for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "process" | "completed" | "cancelled">("all")
  const [menuFilter, setMenuFilter] = useState<"all" | "published" | "draft">("all")
  const [menuCategory, setMenuCategory] = useState<"signature" | "nonCoffee" | "snacks">("signature")
  const [redemptionFilter, setRedemptionFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all")
  
  // State for Add New Item dialog
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("dashboard")
    toast({
      variant: "success",
      title: "Logged Out Successfully",
      description: "You have been logged out from the admin panel",
    })
  }

  // Reset filters when changing tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSearchTerm("")
    setStatusFilter("all")
    setMenuFilter("all")
    setMenuCategory("signature")
    setRedemptionFilter("all")
    setAddItemDialogOpen(false)
  }

  const getStatusLabels = () => {
    switch (activeTab) {
      case "orders":
        return {
          all: "All Orders",
          pending: "Pending",
          process: "In Process",
          completed: "Completed",
          cancelled: "Cancelled",
        }
      case "redemptions":
        return {
          all: "All Redemptions",
          pending: "Pending",
          completed: "Completed",
          cancelled: "Cancelled",
        }
      default:
        return {}
    }
  }

  const statusLabels = getStatusLabels()

  const renderSearchAndFilter = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb] transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto min-w-[180px] justify-between bg-white hover:bg-gray-50 border-gray-200 hover:border-[#2563eb] text-gray-700 hover:text-[#2563eb] transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">{statusLabels[statusFilter]}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                <DropdownMenuItem 
                  onClick={() => setStatusFilter("all")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-150 cursor-pointer"
                >
                  <ListFilter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">All Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter("pending")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Pending</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter("process")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
                >
                  <Loader2 className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">In Process</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter("completed")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors duration-150 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Completed</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter("cancelled")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-150 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Cancelled</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      
      case "menu":
        return (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto min-w-[180px] justify-between bg-white hover:bg-gray-50 border-gray-200 hover:border-[#2563eb] text-gray-700 hover:text-[#2563eb] transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">{menuFilter === "all" ? "All Items" : menuFilter === "published" ? "Published" : "Drafts"}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                <DropdownMenuItem 
                  onClick={() => setMenuFilter("all")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-150 cursor-pointer"
                >
                  <ListFilter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">All Items</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setMenuFilter("published")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors duration-150 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Published</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setMenuFilter("draft")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150 cursor-pointer"
                >
                  <EyeOff className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Drafts</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto min-w-[180px] justify-between bg-white hover:bg-gray-50 border-gray-200 hover:border-[#2563eb] text-gray-700 hover:text-[#2563eb] transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">
                      {menuCategory === "signature" ? "Signature Coffee" : menuCategory === "nonCoffee" ? "Non Coffee" : "Snacks"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                <DropdownMenuItem 
                  onClick={() => setMenuCategory("signature")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-150 cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-[#2563eb]" />
                  <span className="font-medium">Signature Coffee</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setMenuCategory("nonCoffee")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Non Coffee</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setMenuCategory("snacks")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150 cursor-pointer"
                >
                  <Menu className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Snacks</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setAddItemDialogOpen(true)}
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </div>
        )
      
      case "redemptions":
        return (
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto min-w-[180px] justify-between bg-white hover:bg-gray-50 border-gray-200 hover:border-[#2563eb] text-gray-700 hover:text-[#2563eb] transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">{statusLabels[redemptionFilter]}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                <DropdownMenuItem 
                  onClick={() => setRedemptionFilter("all")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-150 cursor-pointer"
                >
                  <ListFilter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">All Redemptions</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRedemptionFilter("pending")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Pending</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRedemptionFilter("completed")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors duration-150 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Completed</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRedemptionFilter("cancelled")}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-150 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Cancelled</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      
      default:
        return null
    }
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          handleLogout={handleLogout}
          menuItems={menuItems}
        />
        <SidebarInset className="flex-1">
          <header className="flex h-auto shrink-0 items-center gap-2 px-4 py-4 bg-white border-b border-gray-200">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-xl font-bold text-[#2563eb]">
                  {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
                </h1>
              </div>
              {renderSearchAndFilter()}
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-[#f5f5f0]">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "menu" && (
              <AdminMenu 
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                menuFilter={menuFilter}
                menuCategory={menuCategory}
                redemptionFilter={redemptionFilter}
                addDialogOpen={addItemDialogOpen}
                setAddDialogOpen={setAddItemDialogOpen}
              />
            )}
            {activeTab === "orders" && (
              <AdminOrders 
                searchTerm={searchTerm}
                statusFilter={statusFilter}
              />
            )}
            {activeTab === "cashier" && <AdminCashier />}
            {activeTab === "redemptions" && (
              <AdminRedemptions 
                redemptionFilter={redemptionFilter}
              />
            )}
            {activeTab === "profile" && <AdminProfile onLogout={handleLogout} />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
