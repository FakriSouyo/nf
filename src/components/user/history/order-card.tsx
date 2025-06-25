import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, MessageCircle, AlertTriangle } from "lucide-react"
import { Order } from "@/types/history"

interface OrderCardProps {
  order: Order
  countdown?: number
  onViewDetails: (order: Order) => void
  onWhatsAppConfirm: (order: Order) => void
}

export default function OrderCard({ order, countdown, onViewDetails, onWhatsAppConfirm }: OrderCardProps) {
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
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
            {order.status === "pending" && countdown && (
              <div className="mb-2">
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    Auto-cancel in: {formatCountdown(countdown)}
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
              onClick={() => onViewDetails(order)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {order.status === "pending" && (
              <Button
                size="sm"
                onClick={() => onWhatsAppConfirm(order)}
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
  )
} 