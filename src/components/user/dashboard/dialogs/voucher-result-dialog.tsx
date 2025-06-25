import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Voucher } from "@/types/dashboard"

interface VoucherResultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentVoucher: Voucher | null
  attempts: number
  onClaim: () => void
  onShakeAgain: () => void
}

export default function VoucherResultDialog({
  open,
  onOpenChange,
  currentVoucher,
  attempts,
  onClaim,
  onShakeAgain,
}: VoucherResultDialogProps) {
  if (!currentVoucher) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">🎉 Voucher Found!</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Image
              src="/cat-thumbs-up.png"
              alt="Success Cat"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-4"
            />
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[#2563eb] mb-2">{currentVoucher.discount}</div>
            <div className="text-xl font-bold text-gray-900 mb-2">{currentVoucher.title}</div>
            <div className="text-gray-600">{currentVoucher.description}</div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={onClaim} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              Claim Voucher
            </Button>
            {attempts > 0 && (
              <Button
                onClick={onShakeAgain}
                variant="outline"
                className="flex-1 text-[#2563eb] border-[#2563eb]"
              >
                Shake Again
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-gray-500">
            {attempts > 0 ? `${attempts} attempts remaining` : "No more attempts today"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 