"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, ShoppingBag, Eye, MessageCircle, ChevronLeft, ChevronRight, AlertTriangle, Search, Package } from "lucide-react"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  date: Date
  status: "pending" | "process" | "completed" | "cancelled"
  type: "online" | "offline"
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

const ITEMS_PER_PAGE = 5

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]")
    const parsedOrders = savedOrders.map((order: any) => ({
      ...order,
      date: new Date(order.date),
      customerName: "Coffee Lover",
      customerEmail: "demo@nefocoffee.com",
      customerPhone: "+6281234567890",
    }))
    
    // Add dummy orders if no orders exist
    const dummyOrders = [
      {
        id: "ORD-HIST-001",
        items: [
          { id: 1, name: "Nefo Original", price: 8000, quantity: 2 },
          { id: 2, name: "Croissant", price: 8000, quantity: 1 },
        ],
        total: 24000,
        date: new Date("2024-03-20T09:30:00"),
        status: "pending",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-002",
        items: [
          { id: 3, name: "Caramel Macchiato", price: 12000, quantity: 1 },
          { id: 4, name: "Cheesecake", price: 25000, quantity: 1 },
        ],
        total: 37000,
        date: new Date("2024-03-19T14:15:00"),
        status: "completed",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-003",
        items: [
          { id: 5, name: "Nefo Special", price: 15000, quantity: 1 },
          { id: 6, name: "Chocolate Frappe", price: 20000, quantity: 1 },
        ],
        total: 35000,
        date: new Date("2024-03-18T11:00:00"),
        status: "completed",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-004",
        items: [
          { id: 7, name: "Velly", price: 15000, quantity: 2 },
          { id: 8, name: "Matcha Latte", price: 18000, quantity: 1 },
        ],
        total: 48000,
        date: new Date("2024-03-17T16:30:00"),
        status: "cancelled",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-005",
        items: [
          { id: 9, name: "Espresso Shot", price: 6000, quantity: 1 },
          { id: 10, name: "Cappuccino Classic", price: 14000, quantity: 1 },
        ],
        total: 20000,
        date: new Date("2024-03-16T10:45:00"),
        status: "completed",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-006",
        items: [
          { id: 11, name: "Mocha Delight", price: 16000, quantity: 1 },
          { id: 12, name: "Americano Bold", price: 10000, quantity: 1 },
        ],
        total: 26000,
        date: new Date("2024-03-15T13:20:00"),
        status: "pending",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-007",
        items: [
          { id: 13, name: "Latte Art", price: 18000, quantity: 1 },
          { id: 14, name: "Flat White", price: 17000, quantity: 1 },
        ],
        total: 35000,
        date: new Date("2024-03-14T15:10:00"),
        status: "completed",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-008",
        items: [
          { id: 15, name: "Ristretto", price: 7000, quantity: 1 },
          { id: 16, name: "Strawberry Smoothie", price: 22000, quantity: 1 },
        ],
        total: 29000,
        date: new Date("2024-03-13T12:30:00"),
        status: "cancelled",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-009",
        items: [
          { id: 17, name: "Mango Tango", price: 19000, quantity: 1 },
          { id: 18, name: "Vanilla Milkshake", price: 16000, quantity: 1 },
        ],
        total: 35000,
        date: new Date("2024-03-12T14:45:00"),
        status: "completed",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-HIST-010",
        items: [
          { id: 19, name: "Blueberry Blast", price: 24000, quantity: 1 },
          { id: 20, name: "Pineapple Paradise", price: 21000, quantity: 1 },
        ],
        total: 45000,
        date: new Date("2024-03-11T11:15:00"),
        status: "pending",
        type: "offline",
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
    ]
    
    const allOrders = savedOrders.length > 0 ? parsedOrders : dummyOrders
    const sortedOrders = allOrders.sort((a: Order, b: Order) => b.date.getTime() - a.date.getTime())
    setOrders(sortedOrders)
    setFilteredOrders(sortedOrders)
  }, [])

  // Filter orders based on search and active filter
  useEffect(() => {
    let filtered = orders.filter((order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((order) => order.status === activeFilter)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, activeFilter, orders])

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const newCountdowns: { [key: string]: number } = {}
      let ordersChanged = false

      const updatedOrders = orders.map((order) => {
        if (order.status === "pending") {
          const orderTime = new Date(order.date).getTime()
          const timeElapsed = now - orderTime
          const timeRemaining = 15 * 60 * 1000 - timeElapsed // 15 minutes in milliseconds

          if (timeRemaining > 0) {
            newCountdowns[order.id] = Math.ceil(timeRemaining / 1000) // Convert to seconds
            return order
          } else {
            // Auto-cancel expired orders
            ordersChanged = true
            return { ...order, status: "cancelled" as const }
          }
        }
        return order
      })

      if (ordersChanged) {
        setOrders(updatedOrders)
        // Update localStorage
        localStorage.setItem("orderHistory", JSON.stringify(updatedOrders))
      }

      setCountdowns(newCountdowns)
    }, 1000)

    return () => clearInterval(interval)
  }, [orders])

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "process":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "online" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDialog(true)
  }

  const handleWhatsAppConfirmation = (order: Order) => {
    const message = `Hi! I want to confirm my order:

Order ID: ${order.id}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}

Items:
${order.items.map((item) => `- ${item.name} x${item.quantity} (Rp ${(item.price * item.quantity).toLocaleString("id-ID")})`).join("\n")}

Total: Rp ${order.total.toLocaleString("id-ID")}

Please confirm my order. Thank you!`

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Handle order cancellation
  const handleCancelOrder = (orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "cancelled" as const } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  }

  // Handle order completion
  const handleCompleteOrder = (orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "completed" as const } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#f5f5f0] border-b border-gray-200 shadow-sm">
        <div className="p-4 md:p-8 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb] mb-2">Order History</h1>
              <p className="text-gray-600">Track your past orders and their status</p>
            </div>
            <div className="flex items-center space-x-3">
              <Image src="/cat-thumbs-up.png" alt="Cat Thumbs Up" width={40} height={40} className="w-10 h-10" />
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-[#2563eb]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-4 overflow-x-auto">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeFilter === "all"
                    ? "bg-[#2563eb] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeFilter === "pending"
                    ? "bg-[#2563eb] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeFilter === "completed"
                    ? "bg-[#2563eb] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveFilter("cancelled")}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeFilter === "cancelled"
                    ? "bg-[#2563eb] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 pt-4">
        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {searchQuery || activeFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by placing your first order from our menu"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(order.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        order.status === "completed"
                          ? "bg-green-500 text-white"
                          : order.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
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

                  {/* Order Total */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-[#2563eb]">Rp {order.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  {order.status === "pending" && (
                    <div className="flex space-x-3 mt-4 pt-4 border-t">
                      <Button
                        onClick={() => handleCancelOrder(order.id)}
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel Order
                      </Button>
                      <Button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Order #{selectedOrder.id}</h3>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>
                    {selectedOrder.date.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Countdown in Dialog */}
                {selectedOrder.status === "pending" && countdowns[selectedOrder.id] && (
                  <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-orange-600">
                        Auto-cancel in: {formatCountdown(countdowns[selectedOrder.id])}
                      </span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1 text-center">
                      Please confirm via WhatsApp or your order will be automatically cancelled
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-2">
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  <Badge className={getTypeColor(selectedOrder.type)}>
                    {selectedOrder.type.charAt(0).toUpperCase() + selectedOrder.type.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Items Ordered:</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{item.name}</h5>
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
                  <span className="text-[#2563eb]">Rp {selectedOrder.total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Status Info */}
              {selectedOrder.type === "offline" && selectedOrder.status === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-700">
                    This is an offline order. Please visit our store to complete the purchase.
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowOrderDialog(false)}
                  variant="outline"
                  className="flex-1 text-gray-600 border-gray-300"
                >
                  Close
                </Button>
                {selectedOrder?.status === "pending" && (
                  <Button
                    onClick={() => handleWhatsAppConfirmation(selectedOrder)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Confirm via WA
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
