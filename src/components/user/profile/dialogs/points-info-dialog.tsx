import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

interface PointsInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PointsInfoDialog({ open, onOpenChange }: PointsInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">
            <HelpCircle className="w-5 h-5 inline mr-2" />
            How to Get Points
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <Image
              src="/cat-thumbs-up.png"
              alt="Points Cat"
              width={60}
              height={60}
              className="w-15 h-15 mx-auto mb-4"
            />
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-1">💰 Purchase Rewards</h4>
              <p className="text-sm text-blue-700">Earn 10 points for every purchase over Rp 50,000</p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-800 mb-1">🎯 Daily Check-in</h4>
              <p className="text-sm text-green-700">Get 5 points for daily app check-ins</p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-1">📱 Social Sharing</h4>
              <p className="text-sm text-purple-700">Earn 15 points for sharing on social media</p>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-bold text-orange-800 mb-1">🎉 Special Events</h4>
              <p className="text-sm text-orange-700">Bonus points during special promotions and events</p>
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