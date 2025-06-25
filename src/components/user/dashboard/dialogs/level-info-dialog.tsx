import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import Image from "next/image"

interface LevelInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LevelInfoDialog({ open, onOpenChange }: LevelInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <HelpCircle className="w-6 h-6 inline mr-2" />
            Coffee Level Info
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Image
              src="/cat-welcome.png"
              alt="Coffee Level"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-4"
            />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
            <div className="text-xl font-bold text-[#2563eb] mb-3">The Curious Sipper</div>
            <p className="text-gray-700 leading-relaxed">
              The Curious Sipper is a beginner-level coffee drinker — someone who is just starting to explore the
              world of coffee. You're discovering new flavors, learning about different brewing methods, and
              developing your taste preferences. Keep exploring and earning points to unlock higher levels!
            </p>
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