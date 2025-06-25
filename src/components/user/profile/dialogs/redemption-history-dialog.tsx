import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Gift } from "lucide-react"
import { Redemption } from "../types"

interface RedemptionHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  redemptions: Redemption[]
}

export default function RedemptionHistoryDialog({
  open,
  onOpenChange,
  redemptions,
}: RedemptionHistoryDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          onClick={() => onOpenChange(false)}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
} 