"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, Filter, ListFilter, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog"
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
  {
    id: "ORD003",
    items: [
      { id: 5, name: "Cappuccino", price: 24000, quantity: 1 },
      { id: 6, name: "Blueberry Muffin", price: 12000, quantity: 1 },
    ],
    total: 36000,
    date: new Date("2024-03-20T11:00:00"),
    status: "completed",
    type: "online",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+62887654321",
  },
  {
    id: "ORD004",
    items: [
      { id: 7, name: "Matcha Latte", price: 26000, quantity: 2 },
      { id: 8, name: "Cheesecake", price: 28000, quantity: 1 },
    ],
    total: 80000,
    date: new Date("2024-03-20T12:30:00"),
    status: "cancelled",
    type: "offline",
  },
  {
    id: "ORD005",
    items: [
      { id: 9, name: "Espresso", price: 18000, quantity: 1 },
      { id: 10, name: "Croissant", price: 15000, quantity: 2 },
    ],
    total: 48000,
    date: new Date("2024-03-20T13:45:00"),
    status: "pending",
    type: "online",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    customerPhone: "+62811223344",
  },
  {
    id: "ORD006",
    items: [
      { id: 11, name: "Mocha", price: 30000, quantity: 1 },
      { id: 12, name: "Tiramisu", price: 32000, quantity: 1 },
    ],
    total: 62000,
    date: new Date("2024-03-20T14:20:00"),
    status: "process",
    type: "offline",
  },
  {
    id: "ORD007",
    items: [
      { id: 13, name: "Flat White", price: 25000, quantity: 1 },
      { id: 14, name: "Chocolate Brownie", price: 18000, quantity: 1 },
    ],
    total: 43000,
    date: new Date("2024-03-20T15:10:00"),
    status: "completed",
    type: "online",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    customerPhone: "+62855667788",
  },
  {
    id: "ORD008",
    items: [
      { id: 15, name: "Ristretto", price: 16000, quantity: 1 },
      { id: 16, name: "Apple Pie", price: 20000, quantity: 1 },
    ],
    total: 36000,
    date: new Date("2024-03-20T16:00:00"),
    status: "pending",
    type: "offline",
  },
  {
    id: "ORD009",
    items: [
      { id: 17, name: "Latte Art", price: 28000, quantity: 2 },
      { id: 18, name: "Strawberry Tart", price: 22000, quantity: 1 },
    ],
    total: 78000,
    date: new Date("2024-03-20T17:30:00"),
    status: "process",
    type: "online",
    customerName: "David Brown",
    customerEmail: "david@example.com",
    customerPhone: "+62899887766",
  },
  {
    id: "ORD010",
    items: [
      { id: 19, name: "Americano", price: 22000, quantity: 1 },
      { id: 20, name: "Cinnamon Roll", price: 16000, quantity: 1 },
    ],
    total: 38000,
    date: new Date("2024-03-20T18:15:00"),
    status: "completed",
    type: "offline",
  },
  {
    id: "ORD011",
    items: [
      { id: 21, name: "Caramel Macchiato", price: 26000, quantity: 1 },
      { id: 22, name: "Lemon Cake", price: 18000, quantity: 1 },
    ],
    total: 44000,
    date: new Date("2024-03-20T19:00:00"),
    status: "pending",
    type: "online",
    customerName: "Emily Davis",
    customerEmail: "emily@example.com",
    customerPhone: "+62833445566",
  },
  {
    id: "ORD012",
    items: [
      { id: 23, name: "Cappuccino", price: 24000, quantity: 2 },
      { id: 24, name: "Chocolate Chip Cookie", price: 12000, quantity: 2 },
    ],
    total: 72000,
    date: new Date("2024-03-20T20:30:00"),
    status: "process",
    type: "offline",
  },
  {
    id: "ORD013",
    items: [
      { id: 25, name: "Espresso Shot", price: 16000, quantity: 1 },
      { id: 26, name: "Blueberry Muffin", price: 14000, quantity: 1 },
    ],
    total: 30000,
    date: new Date("2024-03-20T21:15:00"),
    status: "completed",
    type: "online",
    customerName: "Lisa Anderson",
    customerEmail: "lisa@example.com",
    customerPhone: "+62877889900",
  },
  {
    id: "ORD014",
    items: [
      { id: 27, name: "Mocha Delight", price: 30000, quantity: 1 },
      { id: 28, name: "Cheesecake", price: 28000, quantity: 1 },
    ],
    total: 58000,
    date: new Date("2024-03-20T22:00:00"),
    status: "cancelled",
    type: "offline",
  },
  {
    id: "ORD015",
    items: [
      { id: 29, name: "Flat White", price: 25000, quantity: 1 },
      { id: 30, name: "Strawberry Smoothie", price: 24000, quantity: 1 },
    ],
    total: 49000,
    date: new Date("2024-03-20T23:30:00"),
    status: "pending",
    type: "online",
    customerName: "Tom Wilson",
    customerEmail: "tom@example.com",
    customerPhone: "+62811223344",
  },
]

export default function AdminOrders() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(demoOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "process" | "completed" | "cancelled">("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
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
    
    // Removed toast notifications for search and filter changes
  }, [searchTerm, orders, statusFilter, toast])

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
    
    toast({
      variant: "success",
      title: "Order Completed",
      description: `Order #${orderId} has been completed successfully.`,
    })
  }

  const handleCancel = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    )
    delete countdowns[orderId]
    
    toast({
      variant: "destructive",
      title: "Order Cancelled",
      description: `Order #${orderId} has been cancelled.`,
    })
  }

  const handleDelete = (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    if (order) {
      setOrderToDelete(order)
      setDeleteDialogOpen(true)
    }
  }

  const confirmDelete = () => {
    if (orderToDelete) {
      setOrders((prev) => prev.filter((order) => order.id !== orderToDelete.id))
      
      toast({
        variant: "destructive",
        title: "Order Deleted",
        description: `Order #${orderToDelete.id} has been permanently deleted.`,
      })
      
      setOrderToDelete(null)
    }
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
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#f5f5f0] border-b border-gray-200 shadow-sm">
        <div className="p-4 md:p-8 pb-4">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2563eb]">Order Management</h1>
            <Image src="/cat-welcome.png" alt="Orders Cat" width={32} height={32} className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 focus:border-[#2563eb] focus:ring-[#2563eb] transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto min-w-[180px] justify-between bg-white hover:bg-gray-50 border-gray-200 hover:border-[#2563eb] text-gray-700 hover:text-[#2563eb] transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span className="font-medium">{statusLabels[statusFilter]}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                  <DropdownMenuItem 
                    onClick={() => setStatusFilter("all")}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-150 cursor-pointer"
                  >
                    <ListFilter className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">All Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setStatusFilter("pending")}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-150 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setStatusFilter("process")}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
                  >
                    <Loader2 className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">In Process</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setStatusFilter("completed")}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors duration-150 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Completed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setStatusFilter("cancelled")}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-150 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Cancelled</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 pt-4">
        <div className="max-w-4xl mx-auto space-y-4">
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

          {/* Delete Confirmation Dialog */}
          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            title="Delete Order"
            description="Are you sure you want to delete this order?"
            onConfirm={confirmDelete}
            itemName={orderToDelete ? `Order #${orderToDelete.id}` : undefined}
          />
        </div>
      </div>
    </div>
  )
}
