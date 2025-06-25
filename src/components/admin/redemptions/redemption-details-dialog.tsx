import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, CheckCircle, XCircle, Gift } from "lucide-react"
import RedemptionStatusBadge from "./redemption-status-badge"
import { Redemption } from "./types"

interface RedemptionDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  redemption: Redemption | null
  onComplete: (redemptionId: string) => void
  onCancel: (redemptionId: string) => void
}

export default function RedemptionDetailsDialog({
  open,
  onOpenChange,
  redemption,
  onComplete,
  onCancel,
}: RedemptionDetailsDialogProps) {
  if (!redemption) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Redemption Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Redemption Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Redemption #{redemption.id}</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(redemption.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div>Customer: {redemption.userName}</div>
              <div>Email: {redemption.userId}</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RedemptionStatusBadge status={redemption.status} />
            </div>
          </div>

          {/* Reward Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Reward Details:</h4>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Gift className="w-6 h-6 text-[#2563eb]" />
                <div>
                  <h5 className="font-bold text-[#2563eb]">{redemption.rewardName}</h5>
                  <p className="text-sm text-gray-600">Reward ID: {redemption.rewardId}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2563eb]">{redemption.pointsCost} Points</div>
                <div className="text-sm text-gray-600">Points deducted from customer</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {redemption.status === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 mb-2">Instructions:</h4>
              <p className="text-sm text-yellow-700">
                Customer will show this redemption ID at the store. Please verify the ID and provide the reward to
                complete this redemption.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Close
            </Button>
            {redemption.status === "pending" && (
              <>
                <Button
                  onClick={() => {
                    onComplete(redemption.id)
                    onOpenChange(false)
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button
                  onClick={() => {
                    onCancel(redemption.id)
                    onOpenChange(false)
                  }}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 