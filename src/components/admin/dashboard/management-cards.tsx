import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Users, Gift, Star } from "lucide-react"

interface ManagementCardsProps {
  onNotificationClick: () => void
  onUserClick: () => void
  onVoucherClick: () => void
  onRewardClick: () => void
}

export default function ManagementCards({
  onNotificationClick,
  onUserClick,
  onVoucherClick,
  onRewardClick,
}: ManagementCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#2563eb]">Notification Management</h3>
            <Bell className="w-6 h-6 text-[#2563eb]" />
          </div>
          <p className="text-gray-600 mb-4">Send notifications to users about promotions, rewards, and updates</p>
          <Button
            onClick={onNotificationClick}
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
            onClick={onUserClick}
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
            onClick={onVoucherClick}
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
            onClick={onRewardClick}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            Manage Rewards
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 