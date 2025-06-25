import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"
import { MenuItem } from "@/types"

interface MenuSectionProps {
  items: MenuItem[]
  activeCategory: "signature" | "nonCoffee" | "snacks"
  onCategoryChange: (category: "signature" | "nonCoffee" | "snacks") => void
  cartQuantities: { [key: string | number]: number }
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string | number) => void
}

export default function MenuSection({
  items,
  activeCategory,
  onCategoryChange,
  cartQuantities,
  onAddToCart,
  onRemoveFromCart,
}: MenuSectionProps) {
  const filteredItems = items.filter((item) => item.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onCategoryChange("signature")}
          className={`px-4 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeCategory === "signature"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Signature Coffee
        </button>
        <button
          onClick={() => onCategoryChange("nonCoffee")}
          className={`px-4 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeCategory === "nonCoffee"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Non Coffee
        </button>
        <button
          onClick={() => onCategoryChange("snacks")}
          className={`px-4 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeCategory === "snacks"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Snacks
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-lg font-bold text-[#2563eb]">
                    Rp {(typeof item.price === 'string' ? parseInt(item.price) : item.price).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {cartQuantities[item.id] > 0 ? (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRemoveFromCart(item.id)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4 text-[#2563eb]" />
                      </Button>
                      <span className="font-bold text-[#2563eb] min-w-[20px] text-center">
                        {cartQuantities[item.id]}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => onAddToCart(item)}
                        className="w-8 h-8 p-0 bg-[#2563eb] hover:bg-[#1d4ed8]"
                      >
                        <Plus className="w-4 h-4s text-white" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onAddToCart(item)}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 