import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Calculator, RotateCcw, Gift } from "lucide-react"

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

interface CartSectionProps {
  cart: CartItem[]
  selectedVoucher: Voucher | null
  userEmail: string
  userVouchers: Voucher[]
  onVoucherChange: (voucherId: string) => void
  onCheckout: () => void
  onResetCart: () => void
}

export default function CartSection({
  cart,
  selectedVoucher,
  userEmail,
  userVouchers,
  onVoucherChange,
  onCheckout,
  onResetCart,
}: CartSectionProps) {
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDiscount = () => {
    if (selectedVoucher && selectedVoucher.discount.includes("%")) {
      const discountPercent = Number.parseInt(selectedVoucher.discount.replace("%", ""))
      return (getSubtotal() * discountPercent) / 100
    }
    return 0
  }

  const getTotalPrice = () => {
    const subtotal = getSubtotal()
    if (selectedVoucher) {
      if (selectedVoucher.discount === "FREE") {
        return subtotal
      } else if (selectedVoucher.discount.includes("%")) {
        return subtotal - getDiscount()
      }
    }
    return subtotal
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <Card className="bg-white border-0 shadow-lg sticky top-4">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-[#2563eb]" />
          <h3 className="text-lg font-bold text-gray-900">Current Order</h3>
        </div>

        {/* Voucher Selection */}
        {userEmail !== "N/A" && userVouchers.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-4 h-4 text-green-600" />
              <Label className="text-sm font-medium text-green-800">Using Voucher</Label>
            </div>
            <select
              value={selectedVoucher?.id || ""}
              onChange={(e) => onVoucherChange(e.target.value)}
              className="w-full p-2 border border-green-300 rounded-md text-sm bg-white"
            >
              <option value="">No voucher</option>
              {userVouchers.map((voucher) => (
                <option key={voucher.id} value={voucher.id}>
                  {voucher.title} - {voucher.discount}
                </option>
              ))}
            </select>
            {selectedVoucher && <p className="text-xs text-green-700 mt-1">{selectedVoucher.description}</p>}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No items in cart</p>
          </div>
        ) : (
          <div className="space-y-4">
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

            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal:</span>
                <span>Rp {getSubtotal().toLocaleString("id-ID")}</span>
              </div>

              {selectedVoucher && getDiscount() > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount ({selectedVoucher.discount}):</span>
                  <span>-Rp {getDiscount().toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xl font-bold mb-4 pt-2 border-t">
                <span>Total:</span>
                <span className="text-[#2563eb]">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
              </div>

              {getTotalPrice() >= 50000 && userEmail !== "N/A" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-700 font-medium">🎉 Customer will earn 10 points!</p>
                </div>
              )}

              <Button
                onClick={onCheckout}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white mb-2"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Checkout ({getTotalItems()} items)
              </Button>

              <Button
                onClick={onResetCart}
                variant="outline"
                className="w-full text-gray-600 border-gray-300"
                disabled={cart.length === 0}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Order
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 