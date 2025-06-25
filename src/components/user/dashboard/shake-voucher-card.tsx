import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ShakeVoucherCardProps {
  attempts: number
  onShake: () => void
  isShaking: boolean
}

export default function ShakeVoucherCard({ attempts, onShake, isShaking }: ShakeVoucherCardProps) {
  return (
    <Card className="md:col-span-1 lg:col-span-1 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="text-sm text-gray-600 mb-2">remaining {attempts}</div>
        <div className="text-xl font-bold text-[#2563eb] mb-4">
          shake it
          <br />
          voucher
        </div>
        <Button
          onClick={onShake}
          disabled={attempts <= 0 || isShaking}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
        >
          {isShaking ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2">⭐</div>
              Shaking...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Image
                src="/cat-welcome.png"
                alt="Shake Cat"
                width={20}
                height={20}
                className="w-5 h-5 mr-2"
              />
              {attempts > 0 ? "Shake!" : "No attempts left"}
            </div>
          )}
        </Button>
        {attempts <= 0 && (
          <div className="text-xs text-gray-500 mt-2">Come back tomorrow for more attempts!</div>
        )}
      </CardContent>
    </Card>
  )
} 