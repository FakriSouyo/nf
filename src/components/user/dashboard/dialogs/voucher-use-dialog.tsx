import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Voucher } from "@/types/dashboard"

interface VoucherUseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  voucher: Voucher
  onDelete: () => void
}

export default function VoucherUseDialog({
  open,
  onOpenChange,
  voucher,
  onDelete,
}: VoucherUseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Your Voucher</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
              <div className="text-3xl font-bold text-[#2563eb] mb-2">{voucher.discount}</div>
              <div className="text-xl font-bold text-gray-900 mb-2">{voucher.title}</div>
              <div className="text-gray-600 mb-4">{voucher.description}</div>

              {/* Voucher ID */}
              <div className="text-sm text-gray-500 mb-2">Voucher ID:</div>
              <div className="font-mono text-lg font-bold text-[#2563eb] mb-4">{voucher.id}</div>

              {/* Barcode */}
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-xs text-gray-500 mb-2">Show this barcode to cashier:</div>
                <div className="flex justify-center">
                  <div className="bg-black text-white font-mono text-xs p-2 rounded">
                    |||||| |||| | |||| |||||| | |||| ||||||
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{voucher.id}</div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-[#2563eb] border-[#2563eb]"
            >
              Close
            </Button>
            <Button
              onClick={onDelete}
              variant="outline"
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Voucher
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 