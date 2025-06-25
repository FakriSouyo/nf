import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, Play, CheckCircle, XCircle, Trash2, AlertTriangle } from "lucide-react"
import OrderStatusBadge from "./order-status-badge"
import { Order } from "@/types"

interface OrderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  countdown?: number
  onProcess: (orderId: string) => void
  onComplete: (orderId: string) => void
  onCancel: (orderId: string) => void
  onDelete: (orderId: string) => void
}

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
  countdown,
  onProcess,
  onComplete,
  onCancel,
  onDelete,
}: OrderDetailsDialogProps) {
  if (!order) return null

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order Details #{order.id}</DialogTitle>
          <DialogDescription>
            View and manage order details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Order #{order.id}</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div>Customer: {order.customerName}</div>
              <div>Email: {order.customerEmail}</div>
              <div>Phone: {order.customerPhone}</div>
            </div>

            {/* Countdown in Dialog */}
            {order.status === "pending" && countdown && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    Auto-cancel in: {formatCountdown(countdown)}
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1 text-center">
                  Waiting for customer confirmation via WhatsApp
                </p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <OrderStatusBadge status={order.status} type={order.type} />
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Items Ordered:</h4>
            {order.items.map((item) => (
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
              <span className="text-[#2563eb]">Rp {order.total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Close
            </Button>
            {order.status === "pending" && (
              <Button
                onClick={() => {
                  onProcess(order.id)
                  onOpenChange(false)
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Process
              </Button>
            )}
            {order.status === "process" && (
              <>
                <Button
                  onClick={() => {
                    onComplete(order.id)
                    onOpenChange(false)
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button
                  onClick={() => {
                    onCancel(order.id)
                    onOpenChange(false)
                  }}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
            {order.status === "cancelled" && (
              <Button
                onClick={() => {
                  onDelete(order.id)
                  onOpenChange(false)
                }}
                variant="outline"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 