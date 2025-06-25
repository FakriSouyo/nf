import { Badge } from "@/components/ui/badge"
import { Redemption } from "./types"

type RedemptionStatusBadgeProps = {
  status: Redemption["status"]
}

export default function RedemptionStatusBadge({ status }: RedemptionStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Badge className={getStatusColor(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
} 