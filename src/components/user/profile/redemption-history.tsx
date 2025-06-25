import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Eye } from "lucide-react"

interface RedemptionHistoryProps {
  onViewHistory: () => void
}

export default function RedemptionHistory({ onViewHistory }: RedemptionHistoryProps) {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-[#2563eb]" />
            <span>Redemption History</span>
          </div>
          <Button
            onClick={onViewHistory}
            variant="outline"
            className="text-[#2563eb] border-[#2563eb]"
          >
            <Eye className="w-4 h-4 mr-2" />
            View History
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">Click "View History" to see your redemption history</p>
        </div>
      </CardContent>
    </Card>
  )
} 