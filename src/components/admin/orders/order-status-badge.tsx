import { Badge } from "@/components/ui/badge"
import { Order } from "./types"

type OrderStatusBadgeProps = {
  status: Order["status"]
  type: Order["type"]
}

export default function OrderStatusBadge({ status, type }: OrderStatusBadgeProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "process":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: Order["type"]) => {
    switch (type) {
      case "online":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "offline":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex gap-2">
      <Badge className={getStatusColor(status)}>{status}</Badge>
      <Badge className={getTypeColor(type)}>{type}</Badge>
    </div>
  )
} 