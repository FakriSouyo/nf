"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Eye, CheckCircle, XCircle, Play, Trash2, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Load orders from localStorage and add demo orders with all statuses
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]")
    const demoOrders = [
      {
        id: "ORD-DEMO-001",
        items: [
          { id: 1, name: "Nefo Original", price: 8000, quantity: 2 },
          { id: 2, name: "Caramel Macchiato", price: 12000, quantity: 1 },
        ],
        total: 28000,
        date: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: "completed" as const,
        type: "offline" as const,
        customerName: "Walk-in Customer",
        customerEmail: "N/A",
        customerPhone: "N/A",
      },
      {
        id: "ORD-DEMO-002",
        items: [
          { id: 3, name: "Matcha Latte", price: 18000, quantity: 1 },
          { id: 7, name: "Croissant", price: 8000, quantity: 2 },
        ],
        total: 34000,
        date: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: "process" as const,
        type: "online" as const,
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      },
      {
        id: "ORD-DEMO-003",
        items: [{ id: 4, name: "Velly", price: 15000, quantity: 1 }],
        total: 15000,
        date: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "pending" as const,
        type: "online" as const,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "+6281234567891",
      },
      {
        id: "ORD-DEMO-004",
        items: [
          { id: 5, name: "Chocolate Frappe", price: 20000, quantity: 1 },
          { id: 8, name: "Cheesecake", price: 25000, quantity: 1 },
        ],
        total: 45000,
        date: new Date(Date.now() - 30 * 60 * 1000),
        status: "cancelled" as const,
        type: "online" as const,
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: "+6281234567892",
      },
      ...savedOrders.map((order: any) => ({
        ...order,
        date: new Date(order.date),
        customerName: "Coffee Lover",
        customerEmail: "demo@nefocoffee.com",
        customerPhone: "+6281234567890",
      })),
    ]
    setOrders(demoOrders.sort((a, b) => b.date.getTime() - a.date.getTime()))
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
        // Update localStorage for user orders
        const userOrders = updatedOrders.filter((order) => order.customerEmail !== "N/A")
        localStorage.setItem("orderHistory", JSON.stringify(userOrders))
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

  const handleStatusUpdate = (orderId: string, newStatus: "process" | "completed" | "cancelled") => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)

    // Update localStorage for user orders
    const userOrders = updatedOrders.filter((order) => order.customerEmail !== "N/A")
    localStorage.setItem("orderHistory", JSON.stringify(userOrders))

    // Update selected order if it's the one being modified
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const handleDeleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId)
    setOrders(updatedOrders)

    // Update localStorage for user orders
    const userOrders = updatedOrders.filter((order) => order.customerEmail !== "N/A")
    localStorage.setItem("orderHistory", JSON.stringify(userOrders))

    setShowOrderDialog(false)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDialog(true)
  }

  const canCancelOrder = (order: Order) => {
    if (order.status !== "pending") return false

    const now = new Date().getTime()
    const orderTime = new Date(order.date).getTime()
    const timeElapsed = now - orderTime

    // Can only cancel if 15 minutes have passed
    return timeElapsed >= 15 * 60 * 1000
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Order Management</h1>
        <Image src="/cat-welcome.png" alt="Orders Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      {/* Orders List */}
      <div className="max-w-6xl mx-auto space-y-4">
        {currentOrders.length === 0 ? (
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500">Orders will appear here as customers place them.</p>
            </CardContent>
          </Card>
        ) : (
          currentOrders.map((order) => (
            <Card key={order.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Order #{order.id}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {order.date.toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Customer: {order.customerName}
                      <br />
                      Email: {order.customerEmail}
                      <br />
                      Phone: {order.customerPhone}
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
                        <p className="text-xs text-orange-600 mt-1">Waiting for customer confirmation via WhatsApp</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge
                      className={
                        order.type === "online" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }
                    >
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
                        onClick={() => handleStatusUpdate(order.id, "process")}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Process
                      </Button>
                    )}
                    {order.status === "process" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, "completed")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, "cancelled")}
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {order.status === "cancelled" && (
                      <Button
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
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
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-center space-x-2">
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
                  <div>Customer: {selectedOrder.customerName}</div>
                  <div>Email: {selectedOrder.customerEmail}</div>
                  <div>Phone: {selectedOrder.customerPhone}</div>
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
                      Waiting for customer confirmation via WhatsApp
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-2">
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  <Badge
                    className={
                      selectedOrder.type === "online" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                    }
                  >
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

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowOrderDialog(false)}
                  variant="outline"
                  className="flex-1 text-gray-600 border-gray-300"
                >
                  Close
                </Button>
                {selectedOrder.status === "pending" && (
                  <Button
                    onClick={() => {
                      handleStatusUpdate(selectedOrder.id, "process")
                      setShowOrderDialog(false)
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Process
                  </Button>
                )}
                {selectedOrder.status === "process" && (
                  <>
                    <Button
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.id, "completed")
                        setShowOrderDialog(false)
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                    <Button
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.id, "cancelled")
                        setShowOrderDialog(false)
                      }}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                {selectedOrder.status === "cancelled" && (
                  <Button
                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Order
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
