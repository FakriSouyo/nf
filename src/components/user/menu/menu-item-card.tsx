import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  popular: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  quantity: number
  onAdd: (item: MenuItem) => void
  onRemove: (itemId: number) => void
}

export default function MenuItemCard({ item, quantity, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image
                src={item.image || "/placeholder.svg?height=64&width=64"}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
              {item.popular && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white hover:bg-orange-500 px-1.5 py-0.5 text-[10px]">
                  Popular
                </Badge>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
              <p className="text-[#2563eb] font-bold mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {quantity > 0 ? (
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove(item.id)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold text-[#2563eb] min-w-[20px] text-center">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  onClick={() => onAdd(item)}
                  className="w-8 h-8 p-0 bg-[#2563eb] hover:bg-[#1d4ed8]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => onAdd(item)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}