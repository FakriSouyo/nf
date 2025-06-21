"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit2, Mail, LogOut, User, Shield, Bell, Coffee, Star, Camera, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminProfileProps {
  onLogout: () => void
}

export default function AdminProfile({ onLogout }: AdminProfileProps) {
  const { toast } = useToast()
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@nefocoffee.com",
    phone: "+62 123 456 7890",
    role: "Store Manager",
    joinDate: "January 2023",
    storeLocation: "Jakarta Central",
    profileImage: "/cat-mascot.png",
  })

  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(admin.name)
  const [showEditPhotoDialog, setShowEditPhotoDialog] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const handleSaveName = () => {
    setAdmin((prev) => ({ ...prev, name: newName }))
    setIsEditingName(false)
    
    toast({
      variant: "success",
      title: "Profile Updated",
      description: "Your name has been updated successfully.",
    })
  }

  const handleSavePhoto = () => {
    if (newPhotoUrl) {
      setAdmin((prev) => ({ ...prev, profileImage: newPhotoUrl }))
    } else if (photoFile) {
      const fileUrl = URL.createObjectURL(photoFile)
      setAdmin((prev) => ({ ...prev, profileImage: fileUrl }))
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

  const handleLogout = () => {
    onLogout()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2563eb]">Admin Profile</h1>
        <Image src="/cat-mascot.png" alt="Admin Cat" width={32} height={32} className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Info Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[#2563eb]" />
              <span>Admin Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={admin.profileImage || "/placeholder.svg"}
                    alt="Admin Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowEditPhotoDialog(true)}
                  className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 p-0 rounded-full bg-white border-2 border-[#2563eb]"
                >
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563eb]" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                  {isEditingName ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSaveName} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditingName(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{admin.name}</h2>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingName(true)} className="p-2">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">{admin.role}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{admin.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="w-4 h-4 text-center">📱</span>
                    <span className="text-sm">{admin.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="w-4 h-4 text-center">📍</span>
                    <span className="text-sm">{admin.storeLocation}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Admin since {admin.joinDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-4 md:p-6 text-center">
              <Coffee className="w-6 h-6 md:w-8 md:h-8 text-[#2563eb] mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold text-[#2563eb] mb-1">156</div>
              <div className="text-xs md:text-sm text-gray-600">Orders This Month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-4 md:p-6 text-center">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#2563eb] mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold text-[#2563eb] mb-1">23</div>
              <div className="text-xs md:text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 md:p-6 text-center">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-[#2563eb] mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold text-[#2563eb] mb-1">4.8</div>
              <div className="text-xs md:text-sm text-gray-600">Store Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Permissions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#2563eb]" />
              <span>Admin Permissions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Menu Management</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Order Management</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">User Management</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Voucher & Rewards</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Cashier System</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Analytics Access</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#2563eb]" />
              <span>Admin Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">System Notifications</h3>
                <p className="text-sm text-gray-500">Get notified about system updates and issues</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Order Alerts</h3>
                <p className="text-sm text-gray-500">Receive alerts for new orders and cancellations</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-700">Account Actions</CardTitle>
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
          </CardContent>
        </Card>
      </div>

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
                  src={admin.profileImage || "/placeholder.svg"}
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
    </div>
  )
}
