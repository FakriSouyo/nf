"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Gift, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import StatsGrid from "./dashboard/stats-grid"
import ManagementCards from "./dashboard/management-cards"
import NotificationDialog from "./dashboard/dialogs/notification-dialog"
import UserDialog from "./dashboard/dialogs/user-dialog"
import VoucherDialog from "./dashboard/dialogs/voucher-dialog"
import RewardDialog from "./dashboard/dialogs/reward-dialog"

const demoUsers = [
  { id: 1, name: "Coffee Lover", email: "demo@nefocoffee.com", totalCups: 47, points: 85, locked: true },
  { id: 2, name: "John Doe", email: "john@example.com", totalCups: 23, points: 45, locked: true },
  { id: 3, name: "Jane Smith", email: "jane@example.com", totalCups: 31, points: 62, locked: true },
]

const demoVouchers = [
  { id: 1, title: "Nefo Original", discount: "20%", active: true },
  { id: 2, title: "Caramel Macchiato", discount: "15%", active: true },
  { id: 3, title: "Free Upgrade", discount: "FREE", active: false },
]

const demoRewards = [
  {
    id: "1",
    name: "Free Coffee",
    description: "Get any signature drink for free",
    pointsCost: 100,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
  {
    id: "2",
    name: "Nefo Tumbler",
    description: "Exclusive Nefo Coffee tumbler",
    pointsCost: 150,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
  {
    id: "3",
    name: "Coffee Beans 250g",
    description: "Premium coffee beans to take home",
    pointsCost: 200,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
]

const notificationCategories = [
  { id: "promotion", name: "Promotion", icon: Star, color: "text-orange-600" },
  { id: "reward", name: "Reward", icon: Gift, color: "text-green-600" },
  { id: "system", name: "System", icon: Bell, color: "text-gray-600" },
]

// Sample sales data for the chart
const salesData = [
  { day: "Mon", sales: 850000 },
  { day: "Tue", sales: 1200000 },
  { day: "Wed", sales: 950000 },
  { day: "Thu", sales: 1500000 },
  { day: "Fri", sales: 1800000 },
  { day: "Sat", sales: 2200000 },
  { day: "Sun", sales: 1600000 },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [showNotificationManagement, setShowNotificationManagement] = useState(false)
  const [showUserManagement, setShowUserManagement] = useState(false)
  const [showVoucherManagement, setShowVoucherManagement] = useState(false)
  const [showRewardManagement, setShowRewardManagement] = useState(false)
  const [users, setUsers] = useState(demoUsers)
  const [vouchers, setVouchers] = useState(demoVouchers)
  const [rewards, setRewards] = useState(demoRewards)

  const stats = {
    monthlyOrders: 156,
    dailyOrders: 8,
    totalUsers: 23,
    activeVouchers: vouchers.filter((v) => v.active).length,
    activeRewards: rewards.filter((r) => r.available).length,
    totalRevenue: 45750000,
  }

  const toggleUserLock = (userId: number) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, locked: !user.locked } : user)))
  }

  const updateUserPoints = (userId: number, newPoints: number) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, points: newPoints } : user)))
  }

  const handleSendNotification = (notification: { title: string; message: string; category: string }) => {
    // In a real app, this would send the notification to users
    console.log("Sending notification:", notification)
    toast({
      variant: "success",
      title: "Notification Sent",
      description: "Your notification has been sent successfully.",
    })
    setShowNotificationManagement(false)
  }

  const handleAddVoucher = (voucher: Omit<typeof demoVouchers[0], "id">) => {
    const newVoucher = {
      id: Date.now(),
      ...voucher,
    }
    setVouchers([...vouchers, newVoucher])
    toast({
      variant: "success",
      title: "Voucher Added",
      description: "New voucher has been added successfully.",
    })
  }

  const handleEditVoucher = (voucher: typeof demoVouchers[0]) => {
    setVouchers((prev) => prev.map((v) => (v.id === voucher.id ? voucher : v)))
    toast({
      variant: "success",
      title: "Voucher Updated",
      description: "Voucher has been updated successfully.",
    })
  }

  const handleDeleteVoucher = (id: number) => {
    setVouchers((prev) => prev.filter((v) => v.id !== id))
    toast({
      variant: "success",
      title: "Voucher Deleted",
      description: "Voucher has been deleted successfully.",
    })
  }

  const handleToggleVoucherStatus = (id: number) => {
    setVouchers((prev) => prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)))
  }

  const handleAddReward = (reward: Omit<typeof demoRewards[0], "id">) => {
    const newReward = {
      id: Date.now().toString(),
      ...reward,
    }
    setRewards([...rewards, newReward])
    toast({
      variant: "success",
      title: "Reward Added",
      description: "New reward has been added successfully.",
    })
  }

  const handleEditReward = (reward: typeof demoRewards[0]) => {
    setRewards((prev) => prev.map((r) => (r.id === reward.id ? reward : r)))
    toast({
      variant: "success",
      title: "Reward Updated",
      description: "Reward has been updated successfully.",
    })
  }

  const handleDeleteReward = (id: string) => {
    setRewards((prev) => prev.filter((r) => r.id !== id))
    toast({
      variant: "success",
      title: "Reward Deleted",
      description: "Reward has been deleted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Admin Dashboard</h1>
        <Image src="/cat-mascot.png" alt="Admin Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} salesData={salesData} />

      {/* Management Cards */}
      <ManagementCards
        onNotificationClick={() => setShowNotificationManagement(true)}
        onUserClick={() => setShowUserManagement(true)}
        onVoucherClick={() => setShowVoucherManagement(true)}
        onRewardClick={() => setShowRewardManagement(true)}
      />

      {/* Dialogs */}
      <NotificationDialog
        open={showNotificationManagement}
        onOpenChange={setShowNotificationManagement}
        categories={notificationCategories}
        onSend={handleSendNotification}
      />

      <UserDialog
        open={showUserManagement}
        onOpenChange={setShowUserManagement}
        users={users}
        onUpdatePoints={updateUserPoints}
        onToggleLock={toggleUserLock}
      />

      <VoucherDialog
        open={showVoucherManagement}
        onOpenChange={setShowVoucherManagement}
        vouchers={vouchers}
        onAddVoucher={handleAddVoucher}
        onEditVoucher={handleEditVoucher}
        onDeleteVoucher={handleDeleteVoucher}
        onToggleStatus={handleToggleVoucherStatus}
      />

      <RewardDialog
        open={showRewardManagement}
        onOpenChange={setShowRewardManagement}
        rewards={rewards}
        onAddReward={handleAddReward}
        onEditReward={handleEditReward}
        onDeleteReward={handleDeleteReward}
      />
    </div>
  )
}
