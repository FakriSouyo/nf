"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Edit2,
  Mail,
  LogOut,
  Trash2,
  User,
  Shield,
  Bell,
  Coffee,
  Star,
  Camera,
  Link,
  Gift,
  Eye,
  HelpCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfilePageProps {
  onLogout: () => void
}

interface Redemption {
  id: string
  rewardName: string
  pointsCost: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const { toast } = useToast()
  const [user, setUser] = useState({
    name: "Coffee Lover",
    email: "demo@nefocoffee.com",
    phone: "+62 123 456 7890",
    joinDate: "January 2024",
    totalOrders: 47,
    favoriteOrder: "Nefo Original",
    points: 450,
    level: 3,
    profileImage: "/cat-thumbs-up.png",
  })

  const [redemptions] = useState<Redemption[]>([
    {
      id: "RDM-2024-001",
      rewardName: "Free Coffee",
      pointsCost: 100,
      date: "2024-01-15T10:30:00Z",
      status: "completed",
    },
    {
      id: "RDM-2024-002",
      rewardName: "Nefo Tumbler",
      pointsCost: 150,
      date: "2024-01-10T14:20:00Z",
      status: "pending",
    },
    {
      id: "RDM-2024-003",
      rewardName: "Coffee Beans 250g",
      pointsCost: 200,
      date: "2024-01-05T09:15:00Z",
      status: "completed",
    },
  ])

  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(user.name)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditPhotoDialog, setShowEditPhotoDialog] = useState(false)
  const [showRedemptionHistory, setShowRedemptionHistory] = useState(false)
  const [showPointsInfo, setShowPointsInfo] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const handleSaveName = () => {
    setUser((prev) => ({ ...prev, name: newName }))
    setIsEditingName(false)
    toast({
      variant: "success",
      title: "Profile Updated",
      description: "Your name has been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false)
    toast({
      variant: "success",
      title: "Account Deleted",
      description: "Your account has been deleted successfully.",
    })
    onLogout()
  }

  const handleLogout = () => {
    toast({
      variant: "success",
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
    onLogout()
  }

  const handleSavePhoto = () => {
    if (newPhotoUrl) {
      setUser((prev) => ({ ...prev, profileImage: newPhotoUrl }))
    } else if (photoFile) {
      const fileUrl = URL.createObjectURL(photoFile)
      setUser((prev) => ({ ...prev, profileImage: fileUrl }))
    }
    setShowEditPhotoDialog(false)
    setNewPhotoUrl("")
    setPhotoFile(null)
    toast({
      variant: "success",
      title: "Photo Updated",
      description: "Your profile photo has been updated successfully.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header - Desktop only */}
      <div className="hidden md:block mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Profile</h1>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center space-x-3 mb-8">
        <h1 className="text-3xl font-bold text-[#2563eb]">Profile</h1>
        <Image src="/cat-welcome.png" alt="Cat Welcome" width={40} height={40} className="w-10 h-10" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Info Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[#2563eb]" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowEditPhotoDialog(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-white border-2 border-[#2563eb]"
                >
                  <Camera className="w-4 h-4 text-[#2563eb]" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {isEditingName ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                      />
                      <Button size="sm" onClick={handleSaveName} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingName(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingName(true)} className="p-2">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <span className="w-4 h-4 text-center">📱</span>
                  <span>{user.phone}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Member since {user.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-6 text-center">
              <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#2563eb] mb-1">{user.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#2563eb] mb-1">Level {user.level}</div>
              <div className="text-sm text-gray-600">Coffee Master</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <CardContent className="p-6 text-center relative">
              <Star className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#2563eb] mb-1">{user.points}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                <span>Your Points</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPointsInfo(true)}
                  className="w-4 h-4 p-0 text-gray-400 hover:text-[#2563eb]"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-[#2563eb]" />
              <span>Coffee Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Favorite Order</Label>
                <p className="text-lg text-[#2563eb] font-semibold">{user.favoriteOrder}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redemption History Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-[#2563eb]" />
                <span>Redemption History</span>
              </div>
              <Button
                onClick={() => setShowRedemptionHistory(true)}
                variant="outline"
                className="text-[#2563eb] border-[#2563eb]"
              >
                <Eye className="w-4 h-4 mr-2" />
                View History
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <Gift className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Click "View History" to see your redemption history</p>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#2563eb]" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Get notified about new offers and updates</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Points Info Dialog */}
      <Dialog open={showPointsInfo} onOpenChange={setShowPointsInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">
              <HelpCircle className="w-5 h-5 inline mr-2" />
              How to Get Points
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <Image
                src="/cat-thumbs-up.png"
                alt="Points Cat"
                width={60}
                height={60}
                className="w-15 h-15 mx-auto mb-4"
              />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-1">💰 Purchase Rewards</h4>
                <p className="text-sm text-blue-700">Earn 10 points for every purchase over Rp 50,000</p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-bold text-green-800 mb-1">🎯 Daily Check-in</h4>
                <p className="text-sm text-green-700">Get 5 points for daily app check-ins</p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-1">📱 Social Sharing</h4>
                <p className="text-sm text-purple-700">Earn 15 points for sharing on social media</p>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-bold text-orange-800 mb-1">🎉 Special Events</h4>
                <p className="text-sm text-orange-700">Bonus points during special promotions and events</p>
              </div>
            </div>

            <Button
              onClick={() => setShowPointsInfo(false)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Redemption History Dialog */}
      <Dialog open={showRedemptionHistory} onOpenChange={setShowRedemptionHistory}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Redemption History</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {redemptions.length === 0 ? (
              <div className="text-center py-8">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-600 mb-2">No Redemptions Yet</h3>
                <p className="text-gray-500">Your redemption history will appear here.</p>
              </div>
            ) : (
              redemptions.map((redemption) => (
                <Card key={redemption.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{redemption.rewardName}</h4>
                        <p className="text-sm text-gray-600">ID: {redemption.id}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(redemption.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(redemption.status)}>
                          {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                        </Badge>
                        <p className="text-sm font-bold text-[#2563eb] mt-1">{redemption.pointsCost} pts</p>
                      </div>
                    </div>

                    {redemption.status === "pending" && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-700">
                          🏪 Please visit our store and show this redemption ID to claim your reward.
                        </p>
                      </div>
                    )}

                    {redemption.status === "completed" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-700">✅ Reward successfully claimed!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Button
            onClick={() => setShowRedemptionHistory(false)}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Photo Dialog */}
      <Dialog open={showEditPhotoDialog} onOpenChange={setShowEditPhotoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">
              <Camera className="w-5 h-5 inline mr-2" />
              Edit Profile Photo
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-4">
                <Image
                  src={user.profileImage || "/placeholder.svg"}
                  alt="Current Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="photoFile" className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Upload from device</span>
                </Label>
                <Input
                  id="photoFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setPhotoFile(file)
                      setNewPhotoUrl("")
                    }
                  }}
                  className="mt-1"
                />
              </div>

              <div className="text-center text-sm text-gray-500">or</div>

              <div>
                <Label htmlFor="photoUrl" className="flex items-center space-x-2">
                  <Link className="w-4 h-4" />
                  <span>Enter image URL</span>
                </Label>
                <Input
                  id="photoUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newPhotoUrl}
                  onChange={(e) => {
                    setNewPhotoUrl(e.target.value)
                    setPhotoFile(null)
                  }}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowEditPhotoDialog(false)
                  setNewPhotoUrl("")
                  setPhotoFile(null)
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePhoto}
                disabled={!newPhotoUrl && !photoFile}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-red-600">Delete Account</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <Image src="/cat-welcome.png" alt="Sad Cat" width={60} height={60} className="w-15 h-15 mx-auto mb-4" />
              <p className="text-gray-600">
                Are you sure you want to delete your account? This action cannot be undone and you will lose all your
                points, vouchers, and order history.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowDeleteDialog(false)}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button onClick={handleDeleteAccount} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                Delete Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
