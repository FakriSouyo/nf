import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Users, Gift, Star, DollarSign, TrendingUp } from "lucide-react"

interface StatsGridProps {
  stats: {
    monthlyOrders: number
    dailyOrders: number
    totalUsers: number
    activeVouchers: number
    activeRewards: number
    totalRevenue: number
  }
  salesData: Array<{
    day: string
    sales: number
  }>
}

export default function StatsGrid({ stats, salesData }: StatsGridProps) {
  return (
    <>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.monthlyOrders}</div>
            <div className="text-sm text-gray-600">Total Orders This Month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.dailyOrders}</div>
            <div className="text-sm text-gray-600">Total Orders Today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Registered Users</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Gift className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.activeVouchers}</div>
            <div className="text-sm text-gray-600">Active Vouchers</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">{stats.activeRewards}</div>
            <div className="text-sm text-gray-600">Active Rewards</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
            <div className="text-2xl font-bold text-[#2563eb] mb-1">
              Rp {stats.totalRevenue.toLocaleString("id-ID")}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>

        {/* Sales Chart - spans 2 columns */}
        <Card className="md:col-span-2 bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#2563eb]" />
              <h3 className="text-lg font-bold text-[#2563eb]">Weekly Sales</h3>
            </div>
            <div className="flex items-end h-32 space-x-1">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-32 mr-2 text-xs text-gray-500">
                <span>2.5M</span>
                <span>2M</span>
                <span>1.5M</span>
                <span>1M</span>
                <span>500K</span>
                <span>0</span>
              </div>

              {/* Chart bars */}
              <div className="flex items-end justify-between flex-1 h-32 space-x-1">
                {salesData.map((data, index) => (
                  <div key={data.day} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-sm w-full transition-all duration-300 hover:opacity-80 min-h-[4px]"
                      style={{ height: `${Math.max((data.sales / 2500000) * 100, 4)}%` }}
                      title={`Rp ${data.sales.toLocaleString("id-ID")}`}
                    />
                    <div className="text-xs text-gray-600 mt-2">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 