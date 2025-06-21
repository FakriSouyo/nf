"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Minus, ShoppingCart, User, Calculator, CheckCircle, RotateCcw, Gift } from "lucide-react"

const menuItems = [
  { id: 1, name: "Nefo Original", price: 8000, category: "signature" },
  { id: 2, name: "Caramel Macchiato", price: 12000, category: "signature" },
  { id: 3, name: "Nefo Special", price: 15000, category: "signature" },
  { id: 4, name: "Velly", price: 15000, category: "nonCoffee" },
  { id: 5, name: "Matcha Latte", price: 18000, category: "nonCoffee" },
  { id: 6, name: "Chocolate Frappe", price: 20000, category: "nonCoffee" },
  { id: 7, name: "Croissant", price: 8000, category: "snacks" },
  { id: 8, name: "Cheesecake", price: 25000, category: "snacks" },
]

const registeredUsers = [
  {
    id: 1,
    name: "Coffee Lover",
    email: "demo@nefocoffee.com",
    points: 450,
    vouchers: [
      {
        id: "NEFO2024001",
        title: "Nefo Original",
        discount: "20%",
        description: "Get 20% off your next Nefo Original",
      },
      { id: "NEFO2024002", title: "Free Upgrade", discount: "FREE", description: "Free size upgrade on any drink" },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    points: 45,
    vouchers: [
      {
        id: "NEFO2024003",
        title: "Caramel Macchiato",
        discount: "15%",
        description: "15% discount on Caramel Macchiato",
      },
    ],
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    points: 62,
    vouchers: [],
  },
  {
    id: 4,
    name: "Walk-in Customer",
    email: "N/A",
    points: 0,
    vouchers: [],
  },
]

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

export default function AdminCashier() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedUser, setSelectedUser] = useState(registeredUsers[3]) // Default to walk-in
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [showUserSelect, setShowUserSelect] = useState(false)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  const [activeCategory, setActiveCategory] = useState<"signature" | "nonCoffee" | "snacks">("signature")

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prev.filter((cartItem) => cartItem.id !== itemId)
    })
  }

  const getCartItemQuantity = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    if (selectedVoucher) {
      if (selectedVoucher.discount === "FREE") {
        // Free upgrade - no discount on total
        return subtotal
      } else if (selectedVoucher.discount.includes("%")) {
        const discountPercent = Number.parseInt(selectedVoucher.discount.replace("%", ""))
        return subtotal - (subtotal * discountPercent) / 100
      }
    }
    return subtotal
  }

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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleUserChange = (user: any) => {
    setSelectedUser(user)
    setSelectedVoucher(null) // Reset voucher when changing user
    setShowUserSelect(false)
  }

  const handleVoucherChange = (voucherId: string) => {
    if (voucherId === "") {
      setSelectedVoucher(null)
    } else {
      const voucher = selectedUser.vouchers.find((v: Voucher) => v.id === voucherId)
      setSelectedVoucher(voucher || null)
    }
  }

  const handleCheckout = () => {
    const total = getTotalPrice()
    const pointsEarned = total >= 50000 ? 10 : 0

    // Create order
    const order = {
      id: `ORD-CASHIER-${Date.now()}`,
      items: cart,
      total: total,
      date: new Date(),
      status: "completed",
      type: "offline",
      customerName: selectedUser.name,
      customerEmail: selectedUser.email,
      voucherUsed: selectedVoucher ? selectedVoucher.id : null,
    }

    // Save order to history
    const existingOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]")
    localStorage.setItem("orderHistory", JSON.stringify([order, ...existingOrders]))

    // Remove used voucher from user (in a real app, this would update the database)
    if (selectedVoucher && selectedUser.email !== "N/A") {
      console.log(`Removed voucher ${selectedVoucher.id} from ${selectedUser.name}`)
    }

    // Add points to user if eligible and not walk-in customer
    if (pointsEarned > 0 && selectedUser.email !== "N/A") {
      console.log(`Added ${pointsEarned} points to ${selectedUser.name}`)
    }

    // Clear cart and reset
    setCart([])
    setSelectedVoucher(null)
    setShowCheckoutDialog(false)
    setSelectedUser(registeredUsers[3]) // Reset to walk-in customer
  }

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Cashier System</h1>
        <Image src="/cat-thumbs-up.png" alt="Cashier Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Selection */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#2563eb]" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Customer</Label>
                    <p className="font-bold text-gray-900">{selectedUser.name}</p>
                    {selectedUser.email !== "N/A" && (
                      <p className="text-sm text-gray-600">{selectedUser.points} points</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setShowUserSelect(true)}
                  variant="outline"
                  className="text-[#2563eb] border-[#2563eb]"
                >
                  Change Customer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Tabs */}
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("signature")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "signature"
                  ? "bg-[#2563eb] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Signature Coffee
            </button>
            <button
              onClick={() => setActiveCategory("nonCoffee")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "nonCoffee"
                  ? "bg-[#2563eb] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Non Coffee
            </button>
            <button
              onClick={() => setActiveCategory("snacks")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "snacks"
                  ? "bg-[#2563eb] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Snacks
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-lg font-bold text-[#2563eb]">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getCartItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-[#2563eb] min-w-[20px] text-center">
                            {getCartItemQuantity(item.id)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 p-0 bg-[#2563eb] hover:bg-[#1d4ed8]"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-6">
          <Card className="bg-white border-0 shadow-lg sticky top-4">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-[#2563eb]" />
                <h3 className="text-lg font-bold text-gray-900">Current Order</h3>
              </div>

              {/* Voucher Selection */}
              {selectedUser.email !== "N/A" && selectedUser.vouchers.length > 0 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Gift className="w-4 h-4 text-green-600" />
                    <Label className="text-sm font-medium text-green-800">Using Voucher</Label>
                  </div>
                  <select
                    value={selectedVoucher?.id || ""}
                    onChange={(e) => handleVoucherChange(e.target.value)}
                    className="w-full p-2 border border-green-300 rounded-md text-sm bg-white"
                  >
                    <option value="">No voucher</option>
                    {selectedUser.vouchers.map((voucher: Voucher) => (
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

                    {getTotalPrice() >= 50000 && selectedUser.email !== "N/A" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-700 font-medium">🎉 Customer will earn 10 points!</p>
                      </div>
                    )}

                    <Button
                      onClick={() => setShowCheckoutDialog(true)}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white mb-2"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Checkout ({getTotalItems()} items)
                    </Button>

                    <Button
                      onClick={() => {
                        setCart([])
                        setSelectedVoucher(null)
                      }}
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
        </div>
      </div>

      {/* User Selection Dialog */}
      <Dialog open={showUserSelect} onOpenChange={setShowUserSelect}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Select Customer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {registeredUsers.map((user) => (
              <Card
                key={user.id}
                className={`cursor-pointer border-2 transition-all ${
                  selectedUser.id === user.id ? "border-[#2563eb] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleUserChange(user)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <Image src="/cat-thumbs-up.png" alt="User" width={20} height={20} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.vouchers.length > 0 && (
                          <p className="text-xs text-green-600">{user.vouchers.length} voucher(s) available</p>
                        )}
                      </div>
                    </div>
                    {user.email !== "N/A" && <Badge className="bg-[#2563eb] text-white">{user.points} pts</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
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
              <p className="text-gray-600">Customer: {selectedUser.name}</p>
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
                <span>Rp {getSubtotal().toLocaleString("id-ID")}</span>
              </div>

              {selectedVoucher && getDiscount() > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount ({selectedVoucher.discount}):</span>
                  <span>-Rp {getDiscount().toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-[#2563eb]">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
              </div>

              {getTotalPrice() >= 50000 && selectedUser.email !== "N/A" && (
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
                onClick={() => setShowCheckoutDialog(false)}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button onClick={handleCheckout} className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                Complete Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
