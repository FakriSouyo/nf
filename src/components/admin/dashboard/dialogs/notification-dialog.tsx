import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Send } from "lucide-react"

interface NotificationCategory {
  id: string
  name: string
  icon: any
  color: string
}

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: NotificationCategory[]
  onSend: (notification: { title: string; message: string; category: string }) => void
}

export default function NotificationDialog({ open, onOpenChange, categories, onSend }: NotificationDialogProps) {
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    category: "system",
  })

  const handleSend = () => {
    onSend(notificationForm)
    setNotificationForm({ title: "", message: "", category: "system" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
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
  )
} 