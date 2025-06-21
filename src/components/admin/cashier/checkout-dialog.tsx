import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Voucher {
  id: string
  title: string
  discount: string
  description: string
}

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cart: CartItem[]
  selectedVoucher: Voucher | null
  customerName: string
  userEmail: string
  subtotal: number
  discount: number
  total: number
  onConfirm: () => void
}

export default function CheckoutDialog({
  open,
  onOpenChange,
  cart,
  selectedVoucher,
  customerName,
  userEmail,
  subtotal,
  discount,
  total,
  onConfirm,
}: CheckoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Confirm Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Order Summary</h3>
            <p className="text-gray-600">Customer: {customerName}</p>
          </div>

          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal:</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            {selectedVoucher && discount > 0 && (
              <div className="flex items-center justify-between text-sm text-green-600">
                <span>Discount ({selectedVoucher.discount}):</span>
                <span>-Rp {discount.toLocaleString("id-ID")}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xl font-bold pt-2 border-t">
              <span>Total:</span>
              <span className="text-[#2563eb]">Rp {total.toLocaleString("id-ID")}</span>
            </div>

            {total >= 50000 && userEmail !== "N/A" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium text-center">Customer will earn 10 points!</p>
              </div>
            )}

            {selectedVoucher && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700 font-medium text-center">
                  Voucher "{selectedVoucher.title}" will be used
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              Complete Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 