import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Reward } from "@/types/dashboard"

interface RedeemSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  redeemedReward: Reward | null
  redeemId: string
}

export default function RedeemSuccessDialog({
  open,
  onOpenChange,
  redeemedReward,
  redeemId,
}: RedeemSuccessDialogProps) {
  if (!redeemedReward) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            🎉 Redemption Successful!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">You've successfully redeemed:</h3>
            <div className="text-xl font-bold text-[#2563eb]">{redeemedReward.name}</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
            <div className="text-sm text-gray-600 mb-2">Your Redeem ID:</div>
            <div className="text-2xl font-bold text-[#2563eb] mb-4">{redeemId}</div>
            <div className="text-sm text-gray-700">
              Please come to our store and show this ID to claim your reward!
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 