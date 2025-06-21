"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OrderCard from "./orders/order-card"
import OrderDetailsDialog from "./orders/order-details-dialog"
import OrderPagination from "./orders/order-pagination"

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

// Demo data for orders
const demoOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { id: 1, name: "Signature Latte", price: 28000, quantity: 2 },
      { id: 2, name: "Croissant", price: 15000, quantity: 1 },
    ],
    total: 71000,
    date: new Date("2024-03-20T09:30:00"),
    status: "pending",
    type: "online",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+62812345678",
  },
  {
    id: "ORD002",
    items: [
      { id: 3, name: "Americano", price: 22000, quantity: 1 },
      { id: 4, name: "Chocolate Cake", price: 25000, quantity: 2 },
    ],
    total: 72000,
    date: new Date("2024-03-20T10:15:00"),
    status: "process",
    type: "offline",
  },
  // Add more demo orders as needed
]

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(demoOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "process" | "completed" | "cancelled">("all")
  const ordersPerPage = 5

  // Demo countdown for pending orders (5 minutes)
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Initialize countdowns for pending orders
    const initialCountdowns: { [key: string]: number } = {}
    orders.forEach((order) => {
      if (order.status === "pending") {
        initialCountdowns[order.id] = 300 // 5 minutes in seconds
      }
    })
    setCountdowns(initialCountdowns)

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdowns((prev) => {
        const newCountdowns = { ...prev }
        Object.keys(newCountdowns).forEach((orderId) => {
          if (newCountdowns[orderId] > 0) {
            newCountdowns[orderId]--
          }
          // Auto-cancel order when countdown reaches 0
          if (newCountdowns[orderId] === 0) {
            handleCancel(orderId)
            delete newCountdowns[orderId]
          }
        })
        return newCountdowns
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [orders])

  useEffect(() => {
    const filtered = orders.filter((order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (statusFilter === "all" || order.status === statusFilter)
    )
    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [searchTerm, orders, statusFilter])

  const handleProcess = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "process" } : order
      )
    )
    delete countdowns[orderId]
  }

  const handleComplete = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "completed" } : order
      )
    )
  }

  const handleCancel = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    )
    delete countdowns[orderId]
  }

  const handleDelete = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const statusLabels = {
    all: "All Orders",
    pending: "Pending",
    process: "In Process",
    completed: "Completed",
    cancelled: "Cancelled",
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Order Management</h1>
        <Image src="/cat-welcome.png" alt="Orders Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px] justify-between">
                  {statusLabels[statusFilter]}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("process")}>In Process</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4">
          {currentOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              countdown={countdowns[order.id]}
              onView={() => {
                setSelectedOrder(order)
                setIsDetailsOpen(true)
              }}
              onProcess={handleProcess}
              onComplete={handleComplete}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredOrders.length > ordersPerPage && (
          <OrderPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <OrderDetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          order={selectedOrder}
          countdown={selectedOrder ? countdowns[selectedOrder.id] : undefined}
          onProcess={handleProcess}
          onComplete={handleComplete}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
