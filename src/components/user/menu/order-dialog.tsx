import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cart: CartItem[]
  onCreateOrder: () => void
}

export default function OrderDialog({ open, onOpenChange, cart, onCreateOrder }: OrderDialogProps) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] p-0 flex flex-col">
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Order Summary</DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Order Items */}
          <div className="space-y-4 max-h-[calc(5*5rem)] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                  </p>
                </div>
                <div className="font-bold text-[#2563eb]">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 p-6 space-y-6">
          {/* Total */}
          <div className="flex items-center justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-[#2563eb]">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
          </div>

          {/* Maintenance Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Online payment is under maintenance. Please proceed with offline payment at our store.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={onCreateOrder} className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              Create Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 