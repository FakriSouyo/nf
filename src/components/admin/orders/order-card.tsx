import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye, Play, CheckCircle, XCircle, Trash2, AlertTriangle } from "lucide-react"
import OrderStatusBadge from "./order-status-badge"
import { Order, OrderItem, OrderCardProps } from "@/types"

export default function OrderCard({
  order,
  countdown,
  onView,
  onProcess,
  onComplete,
  onCancel,
  onDelete,
}: OrderCardProps) {
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
            {order.status === "pending" && countdown && (
              <div className="mb-2">
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    Auto-cancel in: {formatCountdown(countdown)}
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1">Waiting for customer confirmation via WhatsApp</p>
              </div>
            )}
          </div>
          <OrderStatusBadge status={order.status} type={order.type} />
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
              onClick={() => onView(order)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {order.status === "pending" && (
              <Button
                size="sm"
                onClick={() => onProcess(order.id)}
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
                  onClick={() => onComplete(order.id)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button
                  size="sm"
                  onClick={() => onCancel(order.id)}
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
                onClick={() => onDelete(order.id)}
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
  )
} 