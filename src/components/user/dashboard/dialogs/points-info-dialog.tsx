import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import Image from "next/image"

interface PointsInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PointsInfoDialog({ open, onOpenChange }: PointsInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <HelpCircle className="w-6 h-6 inline mr-2" />
            How to Get Points
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Image
              src="/cat-thumbs-up.png"
              alt="Points Info"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-4"
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#2563eb] mb-4 text-center">Earn Points by:</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                <span>Making purchases over Rp 50,000 (earn 10 points)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                <span>Completing daily caffeine goals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                <span>Participating in special promotions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                <span>Referring friends to Nefo Coffee</span>
              </div>
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