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
import { demoUsers, demoVouchers, demoRewards, notificationCategories, salesData } from "@/data/admin"

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
    const user = users.find(u => u.id === userId)
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, points: newPoints } : user)))
    
    if (user) {
      toast({
        variant: "success",
        title: "Points Updated",
        description: `${user.name}'s points have been updated to ${newPoints}.`,
      })
    }
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
    const voucher = vouchers.find(v => v.id === id)
    setVouchers((prev) => prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)))
    
    if (voucher) {
      toast({
        variant: voucher.active ? "default" : "success",
        title: voucher.active ? "Voucher Deactivated" : "Voucher Activated",
        description: `${voucher.title} has been ${voucher.active ? 'deactivated' : 'activated'}.`,
      })
    }
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
