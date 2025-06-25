"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

// Components
import MenuHeader from "@/components/user/menu/menu-header"
import MenuItemCard from "@/components/user/menu/menu-item-card"
import OrderDialog from "@/components/user/menu/order-dialog"
import FloatingCartButton from "@/components/user/menu/floating-cart-button"

// Types and Data
import { CategoryType } from "@/types/menu"
import { menuCategories } from "@/data/menu-items"

export default function MenuPage() {
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = useState<CategoryType>("signature")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOrderDialog, setShowOrderDialog] = useState(false)

  const {
    cart,
    addToCart,
    removeFromCart,
    getCartItemQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart()

  const handleCreateOrder = () => {
    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: getTotalPrice(),
      date: new Date(),
      status: "pending",
      type: "offline",
    }

    // Save to localStorage (simulating order history)
    const existingOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]")
    localStorage.setItem("orderHistory", JSON.stringify([order, ...existingOrders]))

    // Clear cart
    clearCart()
    setShowOrderDialog(false)

    // Show success toast
    toast({
      variant: "success",
      title: "Order Created Successfully!",
      description: "Your order has been saved. Please check your order history for details.",
    })
  }

  const filteredItems = menuCategories[activeCategory].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <MenuHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Content */}
      <div className="p-4 md:p-8 pt-4">
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              quantity={getCartItemQuantity(item.id)}
              onAdd={addToCart}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Floating Cart Button */}
        {getTotalItems() > 0 && (
          <FloatingCartButton
            totalItems={getTotalItems()}
            totalPrice={getTotalPrice()}
            onClick={() => setShowOrderDialog(true)}
          />
        )}

        {/* Order Dialog */}
        <OrderDialog
          open={showOrderDialog}
          onOpenChange={setShowOrderDialog}
          cart={cart}
          onCreateOrder={handleCreateOrder}
        />
      </div>
    </div>
  )
}
