import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye, CheckCircle, XCircle } from "lucide-react"
import RedemptionStatusBadge from "./redemption-status-badge"
import { Redemption } from "./types"

interface RedemptionCardProps {
  redemption: Redemption
  onView: (redemption: Redemption) => void
  onComplete: (redemptionId: string) => void
  onCancel: (redemptionId: string) => void
}

export default function RedemptionCard({
  redemption,
  onView,
  onComplete,
  onCancel,
}: RedemptionCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Redemption #{redemption.id}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(redemption.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="text-sm text-gray-600">Customer: {redemption.userName}</div>
          </div>
          <div className="flex items-center space-x-2">
            <RedemptionStatusBadge status={redemption.status} />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Reward:</span>
            <span className="font-medium">{redemption.rewardName}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Points Used:</span>
            <span className="font-medium">{redemption.pointsCost} points</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-[#2563eb]">User: {redemption.userName}</div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onView(redemption)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {redemption.status === "pending" && (
              <>
                <Button
                  size="sm"
                  onClick={() => onComplete(redemption.id)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button
                  size="sm"
                  onClick={() => onCancel(redemption.id)}
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 