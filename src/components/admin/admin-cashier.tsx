"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import UserSelectDialog from "./cashier/user-select-dialog"
import CartSection from "./cashier/cart-section"
import MenuSection from "./cashier/menu-section"
import CheckoutDialog from "./cashier/checkout-dialog"

interface MenuItem {
  id: number
  name: string
  price: number
  category: "signature" | "nonCoffee" | "snacks"
}

const menuItems: MenuItem[] = [
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

  const handleUserChange = (user: any) => {
    setSelectedUser(user)
    setSelectedVoucher(null)
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

          {/* Menu Items */}
          <MenuSection
            items={menuItems}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            cartQuantities={Object.fromEntries(cart.map((item) => [item.id, item.quantity]))}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        </div>

        {/* Cart Section */}
        <CartSection
          cart={cart}
          selectedVoucher={selectedVoucher}
          userEmail={selectedUser.email}
          userVouchers={selectedUser.vouchers}
          onVoucherChange={handleVoucherChange}
          onCheckout={() => setShowCheckoutDialog(true)}
          onResetCart={() => {
            setCart([])
            setSelectedVoucher(null)
          }}
        />
      </div>

      {/* User Selection Dialog */}
      <UserSelectDialog
        open={showUserSelect}
        onOpenChange={setShowUserSelect}
        users={registeredUsers}
        selectedUser={selectedUser}
        onUserChange={handleUserChange}
      />

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={showCheckoutDialog}
        onOpenChange={setShowCheckoutDialog}
        cart={cart}
        selectedVoucher={selectedVoucher}
        customerName={selectedUser.name}
        userEmail={selectedUser.email}
        subtotal={getSubtotal()}
        discount={getDiscount()}
        total={getTotalPrice()}
        onConfirm={handleCheckout}
      />
    </div>
  )
}
