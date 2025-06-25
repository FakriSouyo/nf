import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface FloatingCartButtonProps {
  totalItems: number
  totalPrice: number
  onClick: () => void
}

export default function FloatingCartButton({ totalItems, totalPrice, onClick }: FloatingCartButtonProps) {
  return (
    <div className="fixed bottom-24 right-6 z-40">
      <Button
        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full p-4 shadow-2xl"
        onClick={onClick}
      >
        <ShoppingCart className="w-6 h-6 mr-2" />
        <span className="font-bold">{totalItems}</span>
        <span className="mx-2">•</span>
        <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
      </Button>
    </div>
  )
} 