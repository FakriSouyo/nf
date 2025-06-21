"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Coffee,
  Users,
  Gift,
  Star,
  Plus,
  Edit,
  Trash2,
  Bell,
  Send,
  ToggleLeft,
  ToggleRight,
  Lock,
  Unlock,
  DollarSign,
  TrendingUp,
} from "lucide-react"

const demoUsers = [
  { id: 1, name: "Coffee Lover", email: "demo@nefocoffee.com", totalCups: 47, points: 85, locked: true },
  { id: 2, name: "John Doe", email: "john@example.com", totalCups: 23, points: 45, locked: true },
  { id: 3, name: "Jane Smith", email: "jane@example.com", totalCups: 31, points: 62, locked: true },
]

const weeklyVouchers = [
  { id: 1, title: "Nefo Original", discount: "20%", active: true },
  { id: 2, title: "Caramel Macchiato", discount: "15%", active: true },
  { id: 3, title: "Free Upgrade", discount: "FREE", active: false },
  { id: 4, title: "Matcha Latte", discount: "30%", active: false },
]

const notificationCategories = [
  { id: "promotion", name: "Promotion", icon: Star, color: "text-orange-600" },
  { id: "reward", name: "Reward", icon: Gift, color: "text-green-600" },
  { id: "system", name: "System", icon: Bell, color: "text-gray-600" },
]

const rewardsList = [
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
  const [showUserManagement, setShowUserManagement] = useState(false)
  const [showVoucherManagement, setShowVoucherManagement] = useState(false)
  const [showRewardManagement, setShowRewardManagement] = useState(false)
  const [showNotificationManagement, setShowNotificationManagement] = useState(false)
  const [showAddRewardDialog, setShowAddRewardDialog] = useState(false)
  const [showEditRewardDialog, setShowEditRewardDialog] = useState(false)
  const [editingReward, setEditingReward] = useState(null)

  const [users, setUsers] = useState(demoUsers)
  const [vouchers, setVouchers] = useState(weeklyVouchers)
  const [rewards, setRewards] = useState(rewardsList)
  const [categories, setCategories] = useState(notificationCategories)

  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    category: "system",
  })

  const [rewardForm, setRewardForm] = useState({
    name: "",
    description: "",
    pointsCost: "",
    image: "",
    imageFile: null,
    available: true,
  })

  const stats = {
    monthlyOrders: 156,
    dailyOrders: 8,
    totalUsers: 23,
    activeVouchers: vouchers.filter((v) => v.active).length,
    activeRewards: rewards.filter((r) => r.available).length,
    totalRevenue: 45750000, // Total revenue from completed orders
  }

  const toggleVoucherStatus = (voucherId) => {
    setVouchers((prev) =>
      prev.map((voucher) => (voucher.id === voucherId ? { ...voucher, active: !voucher.active } : voucher)),
    )
  }

  const toggleUserLock = (userId) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, locked: !user.locked } : user)))
  }

  const updateUserPoints = (userId, newPoints) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, points: newPoints } : user)))
  }

  const sendNotification = () => {
    // In a real app, this would send the notification to users
    console.log("Sending notification:", notificationForm)
    setNotificationForm({ title: "", message: "", category: "system" })
    setShowNotificationManagement(false)
  }

  const handleImageUpload = (file, type = "reward") => {
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      const imageUrl = URL.createObjectURL(file)
      if (type === "reward") {
        setRewardForm({ ...rewardForm, imageFile: file, image: imageUrl })
      }
      return imageUrl
    } else {
      alert("File size must be less than 10MB")
      return null
    }
  }

  const handleAddReward = () => {
    const newReward = {
      id: Date.now().toString(),
      name: rewardForm.name,
      description: rewardForm.description,
      pointsCost: Number.parseInt(rewardForm.pointsCost),
      image: rewardForm.image || "/placeholder.svg?height=150&width=150",
      available: rewardForm.available,
    }
    setRewards([...rewards, newReward])
    setShowAddRewardDialog(false)
    resetRewardForm()
  }

  const handleEditReward = () => {
    if (!editingReward) return
    const updatedRewards = rewards.map((reward) =>
      reward.id === editingReward.id
        ? {
            ...reward,
            name: rewardForm.name,
            description: rewardForm.description,
            pointsCost: Number.parseInt(rewardForm.pointsCost),
            image: rewardForm.image || reward.image,
            available: rewardForm.available,
          }
        : reward,
    )
    setRewards(updatedRewards)
    setShowEditRewardDialog(false)
    setEditingReward(null)
    resetRewardForm()
  }

  const handleDeleteReward = (rewardId) => {
    setRewards(rewards.filter((reward) => reward.id !== rewardId))
  }

  const resetRewardForm = () => {
    setRewardForm({
      name: "",
      description: "",
      pointsCost: "",
      image: "",
      imageFile: null,
      available: true,
    })
  }

  const openEditReward = (reward) => {
    setEditingReward(reward)
    setRewardForm({
      name: reward.name,
      description: reward.description,
      pointsCost: reward.pointsCost.toString(),
      image: reward.image,
      imageFile: null,
      available: reward.available,
    })
    setShowEditRewardDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Admin Dashboard</h1>
        <Image src="/cat-mascot.png" alt="Admin Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.monthlyOrders}</div>
            <div className="text-sm text-gray-600">Total Orders This Month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.dailyOrders}</div>
            <div className="text-sm text-gray-600">Total Orders Today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Registered Users</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Gift className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.activeVouchers}</div>
            <div className="text-sm text-gray-600">Active Vouchers</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.activeRewards}</div>
            <div className="text-sm text-gray-600">Active Rewards</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">
              Rp {stats.totalRevenue.toLocaleString("id-ID")}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>

        {/* Sales Chart - spans 2 columns */}
        <Card className="md:col-span-2 bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#2563eb]" />
              <h3 className="text-lg font-bold text-[#2563eb]">Weekly Sales</h3>
            </div>
            <div className="flex items-end h-32 space-x-1">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-32 mr-2 text-xs text-gray-500">
                <span>2.5M</span>
                <span>2M</span>
                <span>1.5M</span>
                <span>1M</span>
                <span>500K</span>
                <span>0</span>
              </div>

              {/* Chart bars */}
              <div className="flex items-end justify-between flex-1 h-32 space-x-1">
                {salesData.map((data, index) => (
                  <div key={data.day} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-sm w-full transition-all duration-300 hover:opacity-80 min-h-[4px]"
                      style={{ height: `${Math.max((data.sales / 2500000) * 100, 4)}%` }}
                      title={`Rp ${data.sales.toLocaleString("id-ID")}`}
                    />
                    <div className="text-xs text-gray-600 mt-2">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2563eb]">Notification Management</h3>
              <Bell className="w-6 h-6 text-[#2563eb]" />
            </div>
            <p className="text-gray-600 mb-4">Send notifications to users about promotions, rewards, and updates</p>
            <Button
              onClick={() => setShowNotificationManagement(true)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Manage Notifications
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2563eb]">User Management</h3>
              <Users className="w-6 h-6 text-[#2563eb]" />
            </div>
            <p className="text-gray-600 mb-4">View registered users and manage their points manually</p>
            <Button
              onClick={() => setShowUserManagement(true)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              View Users
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2563eb]">Voucher Management</h3>
              <Gift className="w-6 h-6 text-[#2563eb]" />
            </div>
            <p className="text-gray-600 mb-4">Set weekly vouchers for random distribution to users</p>
            <Button
              onClick={() => setShowVoucherManagement(true)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Manage Vouchers
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2563eb]">Reward Management</h3>
              <Star className="w-6 h-6 text-[#2563eb]" />
            </div>
            <p className="text-gray-600 mb-4">Manage user rewards, points requirements and availability</p>
            <Button
              onClick={() => setShowRewardManagement(true)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Manage Rewards
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification Management Dialog */}
      <Dialog open={showNotificationManagement} onOpenChange={setShowNotificationManagement}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Bell className="w-6 h-6 inline mr-2" />
              Send Notification
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="notifTitle">Notification Title</Label>
                <Input
                  id="notifTitle"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  placeholder="Enter notification title"
                />
              </div>

              <div>
                <Label htmlFor="notifMessage">Message</Label>
                <Textarea
                  id="notifMessage"
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  placeholder="Enter notification message"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="notifCategory">Category</Label>
                <select
                  id="notifCategory"
                  value={notificationForm.category}
                  onChange={(e) => setNotificationForm({ ...notificationForm, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                  {(() => {
                    const category = categories.find((c) => c.id === notificationForm.category)
                    const IconComponent = category?.icon || Bell
                    return <IconComponent className={`w-5 h-5 mt-1 ${category?.color || "text-gray-600"}`} />
                  })()}
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{notificationForm.title || "Notification Title"}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {notificationForm.message || "Notification message will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowNotificationManagement(false)}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={sendNotification}
                disabled={!notificationForm.title || !notificationForm.message}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Management Dialog */}
      <Dialog open={showUserManagement} onOpenChange={setShowUserManagement}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Users className="w-6 h-6 inline mr-2" />
              User Management
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <Image src="/cat-thumbs-up.png" alt="User" width={24} height={24} className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#2563eb]">{user.totalCups} cups</div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={user.points}
                            onChange={(e) => updateUserPoints(user.id, Number.parseInt(e.target.value) || 0)}
                            disabled={user.locked}
                            className={`w-20 h-8 text-sm text-center ${user.locked ? "bg-gray-100" : ""}`}
                          />
                          <span className="text-sm text-gray-600">points</span>
                          <Button size="sm" variant="outline" onClick={() => toggleUserLock(user.id)} className="p-2">
                            {user.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Management Dialog */}
      <Dialog open={showVoucherManagement} onOpenChange={setShowVoucherManagement}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Gift className="w-6 h-6 inline mr-2" />
              Weekly Voucher Management
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">This Week's Vouchers</h3>
              <Button size="sm" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Voucher
              </Button>
            </div>

            {vouchers.map((voucher) => (
              <Card key={voucher.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{voucher.title}</h4>
                      <p className="text-sm text-gray-600">Discount: {voucher.discount}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => toggleVoucherStatus(voucher.id)} className="flex items-center space-x-2">
                        {voucher.active ? (
                          <ToggleRight className="w-8 h-8 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-gray-400" />
                        )}
                        <span className={`text-sm font-medium ${voucher.active ? "text-green-600" : "text-gray-500"}`}>
                          {voucher.active ? "Active" : "Inactive"}
                        </span>
                      </button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reward Management Dialog */}
      <Dialog open={showRewardManagement} onOpenChange={setShowRewardManagement}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Star className="w-6 h-6 inline mr-2" />
              Reward Management
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Available Rewards</h3>
              <Button
                onClick={() => setShowAddRewardDialog(true)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Reward
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 p-4 flex items-center justify-center">
                      <Image
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="font-bold text-[#2563eb] mb-2">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-[#2563eb] text-white">{reward.pointsCost} pts</Badge>
                      <Badge className={reward.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {reward.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => openEditReward(reward)}
                        className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteReward(reward.id)}
                        variant="outline"
                        className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Reward Dialog */}
      <Dialog open={showAddRewardDialog} onOpenChange={setShowAddRewardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">Add New Reward</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rewardName">Reward Name</Label>
              <Input
                id="rewardName"
                value={rewardForm.name}
                onChange={(e) => setRewardForm({ ...rewardForm, name: e.target.value })}
                placeholder="Enter reward name"
              />
            </div>

            <div>
              <Label htmlFor="rewardDescription">Description</Label>
              <Textarea
                id="rewardDescription"
                value={rewardForm.description}
                onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                placeholder="Enter reward description"
              />
            </div>

            <div>
              <Label htmlFor="rewardPoints">Required Points</Label>
              <Input
                id="rewardPoints"
                type="number"
                value={rewardForm.pointsCost}
                onChange={(e) => setRewardForm({ ...rewardForm, pointsCost: e.target.value })}
                placeholder="Enter required points"
              />
            </div>

            <div>
              <Label htmlFor="rewardImageFile">Upload Image (Max 10MB)</Label>
              <Input
                id="rewardImageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file, "reward")
                  }
                }}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="rewardImage">Or Image URL</Label>
              <Input
                id="rewardImage"
                value={rewardForm.image}
                onChange={(e) => setRewardForm({ ...rewardForm, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {rewardForm.image && (
              <div className="text-center">
                <Image
                  src={rewardForm.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rewardAvailable"
                checked={rewardForm.available}
                onChange={(e) => setRewardForm({ ...rewardForm, available: e.target.checked })}
              />
              <Label htmlFor="rewardAvailable">Available for redemption</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowAddRewardDialog(false)
                  resetRewardForm()
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddReward}
                disabled={!rewardForm.name || !rewardForm.pointsCost}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Add Reward
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Dialog */}
      <Dialog open={showEditRewardDialog} onOpenChange={setShowEditRewardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">Edit Reward</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="editRewardName">Reward Name</Label>
              <Input
                id="editRewardName"
                value={rewardForm.name}
                onChange={(e) => setRewardForm({ ...rewardForm, name: e.target.value })}
                placeholder="Enter reward name"
              />
            </div>

            <div>
              <Label htmlFor="editRewardDescription">Description</Label>
              <Textarea
                id="editRewardDescription"
                value={rewardForm.description}
                onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                placeholder="Enter reward description"
              />
            </div>

            <div>
              <Label htmlFor="editRewardPoints">Required Points</Label>
              <Input
                id="editRewardPoints"
                type="number"
                value={rewardForm.pointsCost}
                onChange={(e) => setRewardForm({ ...rewardForm, pointsCost: e.target.value })}
                placeholder="Enter required points"
              />
            </div>

            <div>
              <Label htmlFor="editRewardImageFile">Upload New Image (Max 10MB)</Label>
              <Input
                id="editRewardImageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file, "reward")
                  }
                }}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="editRewardImage">Or Image URL</Label>
              <Input
                id="editRewardImage"
                value={rewardForm.image}
                onChange={(e) => setRewardForm({ ...rewardForm, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {rewardForm.image && (
              <div className="text-center">
                <Image
                  src={rewardForm.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editRewardAvailable"
                checked={rewardForm.available}
                onChange={(e) => setRewardForm({ ...rewardForm, available: e.target.checked })}
              />
              <Label htmlFor="editRewardAvailable">Available for redemption</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowEditRewardDialog(false)
                  setEditingReward(null)
                  resetRewardForm()
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditReward}
                disabled={!rewardForm.name || !rewardForm.pointsCost}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
