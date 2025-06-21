"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Gift, Coffee, Star, Bell } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "reward" | "order" | "promotion" | "system"
  date: Date
  read: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Reward Available!",
    message: "You've earned enough points for a free coffee! Check out the rewards section.",
    type: "reward",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
  },
  {
    id: "2",
    title: "Welcome to Nefo Coffee!",
    message: "Thanks for joining us! Enjoy your coffee journey with exclusive perks and rewards.",
    type: "system",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
  },
  {
    id: "3",
    title: "Special Promotion",
    message: "Get 20% off on all signature drinks this weekend! Don't miss out.",
    type: "promotion",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
  },
]

interface NotificationDropdownProps {
  onClose: () => void
  onNotificationRead: () => void
}

export default function NotificationDropdown({ onClose, onNotificationRead }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Gift className="w-5 h-5 text-green-600" />
      case "order":
        return <Coffee className="w-5 h-5 text-blue-600" />
      case "promotion":
        return <Star className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "reward":
        return "bg-green-50 border-green-200"
      case "order":
        return "bg-blue-50 border-blue-200"
      case "promotion":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
    setShowNotificationDialog(true)

    // Mark as read
    if (!notification.read) {
      setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
      onNotificationRead()
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown */}
      <Card className="absolute right-0 bottom-12 w-80 max-h-96 overflow-y-auto z-50 shadow-2xl border-0">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Notifications</h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{notification.title}</h4>
                        {!notification.read && <div className="w-2 h-2 bg-[#2563eb] rounded-full flex-shrink-0 ml-2" />}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(notification.date)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Detail Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent className="sm:max-w-md">
          {selectedNotification && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getNotificationColor(selectedNotification.type)}`}>
                <p className="text-gray-700">{selectedNotification.message}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Received:{" "}
                  {selectedNotification.date.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <Badge variant="outline" className="text-xs">
                  {selectedNotification.type}
                </Badge>
              </div>

              <Button
                onClick={() => setShowNotificationDialog(false)}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
