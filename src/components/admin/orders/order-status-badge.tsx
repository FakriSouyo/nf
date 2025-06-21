import { Badge } from "@/components/ui/badge"

interface OrderStatusBadgeProps {
  status: "pending" | "process" | "completed" | "cancelled"
  type?: "online" | "offline"
}

export default function OrderStatusBadge({ status, type }: OrderStatusBadgeProps) {
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

  return (
    <div className="flex items-center space-x-2">
      <Badge className={getStatusColor(status)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
      {type && (
        <Badge
          className={
            type === "online" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )}
    </div>
  )
} 