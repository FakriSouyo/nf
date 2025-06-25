import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"

interface SetGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPoints: number
  maxPoints: number
  newGoal: string
  onNewGoalChange: (value: string) => void
  onSetGoal: () => void
}

export default function SetGoalDialog({
  open,
  onOpenChange,
  currentPoints,
  maxPoints,
  newGoal,
  onNewGoalChange,
  onSetGoal,
}: SetGoalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <Target className="w-6 h-6 inline mr-2" />
            Set Points Goal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Set your points goal to track your progress</p>
            <div className="text-sm text-gray-500">
              Current: {currentPoints} / {maxPoints} pts
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="goal">New Goal (max 500 pts)</Label>
              <Input
                id="goal"
                type="number"
                min="1"
                max="500"
                value={newGoal}
                onChange={(e) => onNewGoalChange(e.target.value)}
                className="text-center text-lg font-bold"
              />
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Preview:</div>
              <Progress value={(currentPoints / Number.parseInt(newGoal || "100")) * 100} className="h-3" />
              <div className="text-xs text-gray-500 mt-1">
                {currentPoints} / {newGoal || maxPoints} pts (
                {Math.round((currentPoints / Number.parseInt(newGoal || "100")) * 100)}%)
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={onSetGoal}
              disabled={!newGoal || Number.parseInt(newGoal) <= 0 || Number.parseInt(newGoal) > 500}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Set Goal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 