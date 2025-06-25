import { Card, CardContent } from "@/components/ui/card"

interface CaffeineData {
  day: string
  amount: number
}

interface CaffeineChartProps {
  data: CaffeineData[]
}

export default function CaffeineChart({ data }: CaffeineChartProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-3 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="text-xl font-bold text-[#2563eb] mb-4">Daily Caffeine Intake</div>
        <div className="flex items-end h-32 space-x-1">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-32 mr-2 text-xs text-gray-500">
            <span>20mg</span>
            <span>15mg</span>
            <span>10mg</span>
            <span>5mg</span>
            <span>0mg</span>
          </div>

          {/* Chart bars */}
          <div className="flex items-end justify-between flex-1 h-32 space-x-1">
            {data.map((item) => (
              <div key={item.day} className="flex flex-col items-center flex-1">
                <div
                  className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-sm w-full transition-all duration-300 hover:opacity-80 min-h-[4px]"
                  style={{ height: `${Math.max((item.amount / 20) * 100, 4)}%` }}
                />
                <div className="text-xs text-gray-600 mt-2 transform -rotate-0">{item.day}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 