import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

interface PointsCardProps {
  points: number
  maxPoints: number
  onSetGoal: () => void
  onInfoClick: () => void
}

export default function PointsCard({ points, maxPoints, onSetGoal, onInfoClick }: PointsCardProps) {
  const progressPercentage = (points / maxPoints) * 100

  return (
    <Card className="md:col-span-2 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold text-[#2563eb]">your points</div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onInfoClick}
            className="p-1 h-6 w-6 text-gray-400 hover:text-[#2563eb]"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          {points}/{maxPoints} pts
        </div>
        <Progress value={progressPercentage} className="h-3 mb-4" />
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">
            {Math.round(progressPercentage)}%
          </Badge>
          <Button
            size="sm"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            onClick={onSetGoal}
          >
            set goal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 