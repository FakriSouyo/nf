import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Calculator, RotateCcw, Gift, Minus, Plus } from "lucide-react"

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
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Sticky Cart Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">({getTotalItems()} items)</span>
            </div>
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

          {/* Cart Summary */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">Rp {getSubtotal().toLocaleString("id-ID")}</span>
            </div>
            {selectedVoucher && getDiscount() > 0 && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>Discount ({selectedVoucher.discount}):</span>
                <span>-Rp {getDiscount().toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Total:</span>
              <span className="text-lg font-bold text-[#2563eb]">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some items from the menu to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
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
          )}
        </div>
      </div>

      {/* Sticky Cart Actions */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 p-4">
          <div className="space-y-3">
            {getTotalPrice() >= 50000 && userEmail !== "N/A" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium">🎉 Customer will earn 10 points!</p>
              </div>
            )}
            <Button
              onClick={onCheckout}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Checkout ({getTotalItems()} items)
            </Button>
            <Button
              onClick={onResetCart}
              variant="outline"
              className="w-full text-gray-600 border-gray-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Order
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 