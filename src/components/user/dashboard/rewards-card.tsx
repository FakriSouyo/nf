import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RewardsCardProps {
  points: number
  onViewRewards: () => void
}

export default function RewardsCard({ points, onViewRewards }: RewardsCardProps) {
  return (
    <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="text-sm text-gray-600 mb-2">points {points}</div>
        <div className="text-2xl font-bold text-[#2563eb] mb-4">
          Redeem
          <br />
          Reward
        </div>
        <Button
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          onClick={onViewRewards}
        >
          View Rewards
        </Button>
      </CardContent>
    </Card>
  )
} 