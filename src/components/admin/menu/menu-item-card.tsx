import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { MenuItem } from "@/types"

interface MenuItemCardProps {
  item: MenuItem
  onEdit: () => void
  onDelete: () => void
}

export default function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
            <Image
              src={item.image || "/placeholder.svg?height=150&width=150"}
              alt={item.name}
              width={150}
              height={150}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            {item.popular && <Badge className="bg-orange-500 text-white hover:bg-orange-500">Popular</Badge>}
            {item.isDraft && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Draft
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-[#2563eb]">
              Rp {typeof item.price === 'string' ? parseInt(item.price) : item.price.toLocaleString("id-ID")}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={onEdit}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              size="sm"
              onClick={onDelete}
              variant="outline"
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 