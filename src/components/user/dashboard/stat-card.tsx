import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  value: string | number
  label: string
  sublabel?: string
  badgeText: string
  badgeVariant?: "default" | "success" | "warning"
}

export default function StatCard({ value, label, sublabel, badgeText, badgeVariant = "default" }: StatCardProps) {
  const getBadgeClass = () => {
    switch (badgeVariant) {
      case "success":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "warning":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      default:
        return "bg-blue-100 text-[#2563eb] hover:bg-blue-100"
    }
  }

  return (
    <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-3xl font-bold text-[#2563eb] mb-2">{value}</div>
        <div className="text-gray-600 text-sm mb-3">
          {label}
          {sublabel && (
            <>
              <br />
              {sublabel}
            </>
          )}
        </div>
        <Badge className={getBadgeClass()}>{badgeText}</Badge>
      </CardContent>
    </Card>
  )
} 