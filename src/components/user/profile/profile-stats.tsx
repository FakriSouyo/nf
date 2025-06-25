import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, Shield, Star, HelpCircle } from "lucide-react"
import { User } from "@/types"

interface ProfileStatsProps {
  user: User
  onShowPointsInfo: () => void
}

export default function ProfileStats({ user, onShowPointsInfo }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
        <CardContent className="p-6 text-center">
          <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
          <div className="text-2xl font-bold text-[#2563eb] mb-1">{user.totalOrders || 0}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
        <CardContent className="p-6 text-center">
          <Shield className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
          <div className="text-2xl font-bold text-[#2563eb] mb-1">Level {user.level || 1}</div>
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
              onClick={onShowPointsInfo}
              className="w-4 h-4 p-0 text-gray-400 hover:text-[#2563eb]"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 