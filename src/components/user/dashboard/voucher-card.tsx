import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Voucher {
  id: string
  title: string
  discount: string
  description: string
}

interface VoucherCardProps {
  voucher: Voucher
  onUse: () => void
}

export default function VoucherCard({ voucher, onUse }: VoucherCardProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-xl font-bold text-[#2563eb] mb-2">{voucher.title}</div>
        <div className="text-gray-600 text-sm mb-4">{voucher.description}</div>
        <div className="text-sm text-gray-500 mb-3">your current voucher</div>
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">{voucher.discount}</Badge>
          <Button
            size="sm"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            onClick={onUse}
            disabled={voucher.title === "No Voucher"}
          >
            use it
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 