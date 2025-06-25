import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Loader2 } from "lucide-react"
import Image from "next/image"
import { Reward } from "@/types/dashboard"
import { rewards } from "@/data/dashboard-sample"

interface RewardsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userPoints: number
  isRedeeming: boolean
  redeemedReward: Reward | null
  onRedeem: (reward: Reward) => void
}

export default function RewardsDialog({
  open,
  onOpenChange,
  userPoints,
  isRedeeming,
  redeemedReward,
  onRedeem,
}: RewardsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <Gift className="w-6 h-6 inline mr-2" />
            Redeem Rewards
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600">Use your points to get amazing rewards!</p>
            <div className="text-lg font-bold text-[#2563eb] mt-2">Your Points: {userPoints}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`${reward.available ? "" : "opacity-50"} border-0 shadow-lg`}>
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
                    <Badge className={reward.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {reward.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onRedeem(reward)}
                    disabled={!reward.available || userPoints < reward.pointsCost || isRedeeming}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50"
                  >
                    {isRedeeming && redeemedReward?.id === reward.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Redeeming...
                      </>
                    ) : userPoints >= reward.pointsCost && reward.available ? (
                      "Redeem"
                    ) : !reward.available ? (
                      "Unavailable"
                    ) : (
                      "Not enough pts"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 