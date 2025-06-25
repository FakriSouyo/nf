import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ShakeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  attempts: number
  isShaking: boolean
  onShake: () => void
  onResetDemo: () => void
}

export default function ShakeDialog({
  open,
  onOpenChange,
  attempts,
  isShaking,
  onShake,
  onResetDemo,
}: ShakeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Shake for Vouchers!</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Shake to reveal a voucher</p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-sm text-gray-600">Attempts remaining:</div>
              <Badge variant="outline" className="text-[#2563eb] border-[#2563eb]">
                {attempts}/3
              </Badge>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div
                className={`w-48 h-48 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                  isShaking ? "animate-bounce scale-110" : "hover:scale-105"
                }`}
                onClick={onShake}
              >
                {isShaking ? (
                  <div className="text-center text-white">
                    <div className="animate-spin text-4xl mb-2">⭐</div>
                    <div className="font-bold">Shaking...</div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <Image
                      src="/cat-welcome.png"
                      alt="Shake Cat"
                      width={60}
                      height={60}
                      className="w-15 h-15 mx-auto mb-2"
                    />
                    <div className="font-bold text-lg">
                      {attempts > 0 ? "SHAKE ME!" : "No attempts left"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {attempts === 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Come back tomorrow for more shake attempts!</p>
              <Button
                onClick={onResetDemo}
                variant="outline"
                className="text-[#2563eb] border-[#2563eb]"
              >
                Reset for Demo
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 