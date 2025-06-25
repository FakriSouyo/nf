"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog"
import OrderCard from "./orders/order-card"
import OrderDetailsDialog from "./orders/order-details-dialog"
import OrderPagination from "./orders/order-pagination"
import { Order, AdminOrdersProps } from "@/types"
import { demoOrders } from "@/data/orders"

export default function AdminOrders({
  searchTerm = "",
  statusFilter = "all"
}: AdminOrdersProps) {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>(demoOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(demoOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
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

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Content */}
      <div className="p-4 md:p-8">
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
