"use client"

import { useEffect, useState } from "react"
import { Order } from "@/types/history"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import HistoryHeader from "@/components/user/history/history-header"
import OrderCard from "@/components/user/history/order-card"
import OrderDetailsDialog from "@/components/user/history/order-details-dialog"

// Sample data - in real app, this would come from an API
const sampleOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { id: 1, name: "Nefo Original", price: 18000, quantity: 2 },
      { id: 2, name: "Croissant", price: 15000, quantity: 1 },
    ],
    total: 51000,
    date: new Date("2024-03-10T14:30:00"),
    status: "pending",
    type: "online",
  },
  {
    id: "ORD002",
    items: [
      { id: 3, name: "Matcha Latte", price: 22000, quantity: 1 },
      { id: 4, name: "Chocolate Brownie", price: 18000, quantity: 2 },
    ],
    total: 58000,
    date: new Date("2024-03-09T16:45:00"),
    status: "completed",
    type: "offline",
  },
  // Add more sample orders as needed
]

const ITEMS_PER_PAGE = 5

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [countdowns, setCountdowns] = useState<Record<string, number>>({})

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = orders.slice(startIndex, endIndex)

  // Handle countdown for pending orders
  useEffect(() => {
    const pendingOrders = orders.filter((order) => order.status === "pending")
    if (pendingOrders.length === 0) return

    const initialCountdowns: Record<string, number> = {}
    pendingOrders.forEach((order) => {
      // Set 5 minutes countdown for each pending order
      initialCountdowns[order.id] = 300
    })
    setCountdowns(initialCountdowns)

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const newCountdowns = { ...prev }
        Object.keys(newCountdowns).forEach((orderId) => {
          if (newCountdowns[orderId] > 0) {
            newCountdowns[orderId]--
          } else {
            // Auto cancel order when countdown reaches 0
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: "cancelled" } : order
              )
            )
            delete newCountdowns[orderId]
          }
        })
        return newCountdowns
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [orders])

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handleWhatsAppConfirm = (order: Order) => {
    // Format the order details for WhatsApp message
    const items = order.items
      .map((item) => `${item.name} x${item.quantity} (Rp ${item.price.toLocaleString("id-ID")})`)
      .join("\n")
    
    const message = `*Order Confirmation #${order.id}*\n\n` +
      `Items:\n${items}\n\n` +
      `Total: Rp ${order.total.toLocaleString("id-ID")}\n\n` +
      `Please confirm my order. Thank you!`

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, "_blank")

    // Update order status to "process"
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, status: "process" } : o
      )
    )

    // Remove countdown for confirmed order
    setCountdowns((prev) => {
      const newCountdowns = { ...prev }
      delete newCountdowns[order.id]
      return newCountdowns
    })

    setIsDetailsOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HistoryHeader />

      {/* Orders List */}
      <div className="space-y-4 mt-8">
        {currentOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            countdown={countdowns[order.id]}
            onViewDetails={handleViewDetails}
            onWhatsAppConfirm={handleWhatsAppConfirm}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        order={selectedOrder}
        countdown={selectedOrder ? countdowns[selectedOrder.id] : undefined}
        onWhatsAppConfirm={handleWhatsAppConfirm}
      />
    </div>
  )
}
