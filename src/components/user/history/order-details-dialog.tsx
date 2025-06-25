import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, MessageCircle, AlertTriangle } from "lucide-react"
import { Order } from "@/types/history"

interface OrderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  countdown?: number
  onWhatsAppConfirm: (order: Order) => void
}

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
  countdown,
  onWhatsAppConfirm,
}: OrderDetailsDialogProps) {
  if (!order) return null

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

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Order #{order.id}</h3>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
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

            {/* Countdown */}
            {order.status === "pending" && countdown && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    Auto-cancel in: {formatCountdown(countdown)}
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1 text-center">
                  Please confirm via WhatsApp or your order will be automatically cancelled
                </p>
              </div>
            )}

            <div className="flex items-center justify-center space-x-2">
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <Badge className={getTypeColor(order.type)}>
                {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
              </Badge>
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

          {/* Status Info */}
          {order.type === "offline" && order.status === "pending" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                This is an offline order. Please visit our store to complete the purchase.
              </p>
            </div>
          )}

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
                onClick={() => onWhatsAppConfirm(order)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Confirm via WA
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 