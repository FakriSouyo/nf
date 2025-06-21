"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, ShoppingBag, Eye, MessageCircle, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"

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
    setOrders(parsedOrders.sort((a: Order, b: Order) => b.date.getTime() - a.date.getTime()))
  }, [])

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
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = orders.slice(startIndex, endIndex)

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

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Order History</h1>
        <Image src="/cat-welcome.png" alt="Cat Welcome" width={40} height={40} className="w-10 h-10" />
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {currentOrders.length === 0 ? (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500">Your order history will appear here once you make your first order.</p>
            </CardContent>
          </Card>
        ) : (
          currentOrders.map((order) => (
            <Card key={order.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Order #{order.id}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {order.date.toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Countdown Timer */}
                    {order.status === "pending" && countdowns[order.id] && (
                      <div className="mb-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="font-bold text-orange-600">
                            Auto-cancel in: {formatCountdown(countdowns[order.id])}
                          </span>
                        </div>
                        <p className="text-xs text-orange-600 mt-1">
                          Please confirm via WhatsApp or your order will be automatically cancelled
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge className={getTypeColor(order.type)}>
                      {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-sm text-gray-500">+{order.items.length - 2} more items</div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-[#2563eb]">
                    Total: Rp {order.total.toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleWhatsAppConfirmation(order)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Confirm via WA
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="text-[#2563eb] border-[#2563eb]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? "bg-[#2563eb] text-white"
                    : "text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="text-[#2563eb] border-[#2563eb]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
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
