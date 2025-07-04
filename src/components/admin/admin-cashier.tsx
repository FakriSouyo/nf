"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import UserSelectDialog from "./cashier/user-select-dialog"
import CartSection from "./cashier/cart-section"
import MenuSection from "./cashier/menu-section"
import CheckoutDialog from "./cashier/checkout-dialog"
import { MenuItem, CartItem, Voucher } from "@/types"
import { menuItems, registeredUsers } from "@/data/cashier"

export default function AdminCashier() {
  const { toast } = useToast()
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
    const itemToRemove = cart.find(item => item.id === itemId)
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
      
      if (voucher) {
        toast({
          variant: "success",
          title: "Voucher Applied",
          description: `${voucher.title} voucher has been applied.`,
        })
      }
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
    
    toast({
      variant: "success",
      title: "Order Completed",
      description: `Order #${order.id} has been completed successfully. Total: Rp ${total.toLocaleString("id-ID")}`,
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2563eb]">Cashier System</h1>
        <Image src="/cat-thumbs-up.png" alt="Cashier Cat" width={32} height={32} className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6 overflow-y-auto">
          {/* Sticky User Selection */}
          <div className="sticky top-0 z-10 bg-[#f5f5f0]/80 backdrop-blur-md border-b border-gray-200 pb-4 -mx-4 px-4">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-[#2563eb]" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{selectedUser.name}</p>
                      {selectedUser.email !== "N/A" && (
                        <p className="text-xs sm:text-sm text-gray-600">{selectedUser.points} points</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowUserSelect(true)}
                    variant="outline"   
                    className="w-full sm:w-auto text-[#2563eb] border-[#2563eb] text-sm"
                  >
                    Change Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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

        {/* Fixed Cart Section */}
        <div className="hidden lg:block">
          <div className="fixed w-[calc(33.333%-2rem)] max-w-md">
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
        </div>

        {/* Mobile Cart Section - Only visible on mobile */}
        <div className="lg:hidden">
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
