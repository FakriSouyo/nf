"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Plus, Minus, ShoppingCart, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const menuCategories = {
  signature: [
    {
      id: 1,
      name: "Nefo Original",
      description: "Kopi original buatan nefo",
      price: 8000,
      image: "/placeholder.svg?height=200&width=200",
      popular: true,
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      description: "Sweet caramel with espresso",
      price: 12000,
      image: "/placeholder.svg?height=200&width=200",
      popular: false,
    },
    {
      id: 3,
      name: "Nefo Special",
      description: "Our signature blend",
      price: 15000,
      image: "/placeholder.svg?height=200&width=200",
      popular: true,
    },
  ],
  nonCoffee: [
    {
      id: 4,
      name: "Velly",
      description: "Red velvet khas nefo",
      price: 15000,
      image: "/placeholder.svg?height=200&width=200",
      popular: true,
    },
    {
      id: 5,
      name: "Matcha Latte",
      description: "Premium matcha blend",
      price: 18000,
      image: "/placeholder.svg?height=200&width=200",
      popular: false,
    },
    {
      id: 6,
      name: "Chocolate Frappe",
      description: "Rich chocolate delight",
      price: 20000,
      image: "/placeholder.svg?height=200&width=200",
      popular: false,
    },
  ],
  snacks: [
    {
      id: 7,
      name: "Croissant",
      description: "Buttery and flaky pastry",
      price: 8000,
      image: "/placeholder.svg?height=200&width=200",
      popular: false,
    },
    {
      id: 8,
      name: "Cheesecake",
      description: "Creamy New York style",
      price: 25000,
      image: "/placeholder.svg?height=200&width=200",
      popular: true,
    },
  ],
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function MenuPage() {
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = useState<"signature" | "nonCoffee" | "snacks">("signature")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showOrderDialog, setShowOrderDialog] = useState(false)

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
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

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
    setCart([])
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
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb] mb-2">Menu</h1>
          <p className="text-gray-600">Choose your perfect coffee experience</p>
        </div>
        <div className="flex items-center space-x-3">
          <Image src="/cat-thumbs-up.png" alt="Cat Thumbs Up" width={40} height={40} className="w-10 h-10" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white border-gray-200 focus:border-[#2563eb]"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg?height=150&width=150"}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {item.popular && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white hover:bg-orange-500">Popular</Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#2563eb]">Rp {item.price.toLocaleString("id-ID")}</div>
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
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-24 right-6 z-40">
          <Button
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full p-4 shadow-2xl"
            onClick={() => setShowOrderDialog(true)}
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            <span className="font-bold">{getTotalItems()}</span>
            <span className="mx-2">•</span>
            <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
          </Button>
        </div>
      )}

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Order Summary</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Items */}
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
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#2563eb]">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Maintenance Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-bold text-yellow-800">Online Payment Under Maintenance</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Online payment is currently under maintenance. Please visit our store to complete your order. Your order
                will be saved to history for reference.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowOrderDialog(false)}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Continue Shopping
              </Button>
              <Button onClick={handleCreateOrder} className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                Save Order
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Order will be saved to your history. Visit our store to complete the purchase.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
