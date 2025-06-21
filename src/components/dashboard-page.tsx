"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RotateCcw, Trash2, Target, Gift, HelpCircle, Loader2, CheckCircle } from "lucide-react"

interface Voucher {
  id: string
  title: string
  discount: string
  description: string
  claimed: boolean
  expiresAt: Date
}

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  image: string
  available: boolean
}

const availableVouchers = [
  { title: "Nefo Original", discount: "20%", description: "Get 20% off your next Nefo Original" },
  { title: "Caramel Macchiato", discount: "15%", description: "15% discount on Caramel Macchiato" },
  { title: "Velly", discount: "25%", description: "25% off Red Velvet special" },
  { title: "Free Upgrade", discount: "FREE", description: "Free size upgrade on any drink" },
  { title: "Buy 1 Get 1", discount: "BOGO", description: "Buy one get one free on signature drinks" },
  { title: "Matcha Latte", discount: "30%", description: "30% off premium Matcha Latte" },
]

const rewards: Reward[] = [
  {
    id: "1",
    name: "Free Coffee",
    description: "Get any signature drink for free",
    pointsCost: 100,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
  {
    id: "2",
    name: "Nefo Tumbler",
    description: "Exclusive Nefo Coffee tumbler",
    pointsCost: 150,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
  {
    id: "3",
    name: "Coffee Beans 250g",
    description: "Premium coffee beans to take home",
    pointsCost: 200,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
  {
    id: "4",
    name: "VIP Member",
    description: "1 month VIP membership with exclusive perks",
    pointsCost: 500,
    image: "/placeholder.svg?height=150&width=150",
    available: false,
  },
  {
    id: "5",
    name: "Premium Beans 500g",
    description: "Premium coffee beans 500g package",
    pointsCost: 350,
    image: "/placeholder.svg?height=150&width=150",
    available: true,
  },
]

// Sample caffeine data for the chart
const caffeineData = [
  { day: "Mon", amount: 8 },
  { day: "Tue", amount: 12 },
  { day: "Wed", amount: 5 },
  { day: "Thu", amount: 15 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
]

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "Coffee Lover",
    monthlyOrders: 12,
    dailyOrders: 1,
    totalCaffeine: 40,
    points: 450, // Increased points for testing redemption
    maxPoints: 500,
    level: "The Curious Sipper",
    shakeAttempts: 1,
    currentVoucher: {
      id: "NEFO2024001",
      title: "Nefo Original",
      discount: "20%",
      description: "Get 20% off your next Nefo Original",
    },
  })

  const [isShaking, setIsShaking] = useState(false)
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null)
  const [showShakeDialog, setShowShakeDialog] = useState(false)
  const [showVoucherResult, setShowVoucherResult] = useState(false)
  const [showRewardsDialog, setShowRewardsDialog] = useState(false)
  const [showVoucherDialog, setShowVoucherDialog] = useState(false)
  const [showSetGoalDialog, setShowSetGoalDialog] = useState(false)
  const [showLevelInfoDialog, setShowLevelInfoDialog] = useState(false)
  const [showPointsInfoDialog, setShowPointsInfoDialog] = useState(false)
  const [showRedeemSuccessDialog, setShowRedeemSuccessDialog] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redeemId, setRedeemId] = useState("")
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null)
  const [newGoal, setNewGoal] = useState(user.maxPoints.toString())

  const caffeinePercentage = (user.totalCaffeine / user.caffeineGoal) * 100
  const levelProgress = ((user.points % 100) / 100) * 100

  const handleShake = () => {
    if (user.shakeAttempts <= 0) return

    setIsShaking(true)

    setTimeout(() => {
      const randomVoucher = availableVouchers[Math.floor(Math.random() * availableVouchers.length)]
      const newVoucher: Voucher = {
        id: Date.now().toString(),
        title: randomVoucher.title,
        discount: randomVoucher.discount,
        description: randomVoucher.description,
        claimed: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }

      setCurrentVoucher(newVoucher)
      setShowVoucherResult(true)
      setIsShaking(false)

      setUser((prev) => ({
        ...prev,
        shakeAttempts: prev.shakeAttempts - 1,
      }))
    }, 2000)
  }

  const handleClaimVoucher = () => {
    if (currentVoucher) {
      setUser((prev) => ({
        ...prev,
        currentVoucher: {
          id: `NEFO2024${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          title: currentVoucher.title,
          discount: currentVoucher.discount,
          description: currentVoucher.description,
        },
      }))
      setCurrentVoucher(null)
      setShowVoucherResult(false)
      setShowShakeDialog(false)
    }
  }

  const handleDeleteVoucher = () => {
    setUser((prev) => ({
      ...prev,
      currentVoucher: {
        id: "",
        title: "No Voucher",
        discount: "0%",
        description: "You don't have any active vouchers",
      },
    }))
    setShowVoucherDialog(false)
  }

  const handleSetGoal = () => {
    const goal = Number.parseInt(newGoal)
    if (goal > 0 && goal <= 500) {
      setUser((prev) => ({
        ...prev,
        maxPoints: goal,
      }))
      setShowSetGoalDialog(false)
    }
  }

  const redeemReward = async (reward: Reward) => {
    if (user.points >= reward.pointsCost && reward.available) {
      setIsRedeeming(true)
      setRedeemedReward(reward)

      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate redeem ID
      const newRedeemId = `RDM${Date.now().toString().slice(-6)}`
      setRedeemId(newRedeemId)

      // Save redemption to localStorage for admin
      const existingRedemptions = JSON.parse(localStorage.getItem("userRedemptions") || "[]")
      const newRedemption = {
        id: newRedeemId,
        userId: "demo@nefocoffee.com",
        userName: user.name,
        rewardId: reward.id,
        rewardName: reward.name,
        pointsCost: reward.pointsCost,
        date: new Date().toISOString(),
        status: "pending",
      }
      localStorage.setItem("userRedemptions", JSON.stringify([newRedemption, ...existingRedemptions]))

      // Deduct points
      setUser((prev) => ({
        ...prev,
        points: prev.points - reward.pointsCost,
      }))

      setIsRedeeming(false)
      setShowRewardsDialog(false)
      setShowRedeemSuccessDialog(true)
    }
  }

  const handleShakeAgain = () => {
    setCurrentVoucher(null)
    setShowVoucherResult(false)
  }

  const addCaffeine = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      totalCaffeine: Math.min(prev.totalCaffeine + amount, prev.caffeineGoal),
      points: prev.points + Math.floor(amount / 50) * 10,
    }))
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {/* Header - positioned above monthly orders on desktop */}
        <div className="md:col-span-4 lg:col-span-6 mb-4 md:mb-0">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Hello, User</h1>
            <Image src="/cat-mascot.png" alt="Cat Mascot" width={40} height={40} className="w-10 h-10" />
          </div>
        </div>

        {/* Monthly Orders */}
        <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-[#2563eb] mb-2">{user.monthlyOrders} cups</div>
            <div className="text-gray-600 text-sm mb-3">
              Total Orders
              <br />
              Monthly
            </div>
            <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">+2 this month</Badge>
          </CardContent>
        </Card>

        {/* Daily Orders */}
        <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-[#2563eb] mb-2">{user.dailyOrders} cups</div>
            <div className="text-gray-600 text-sm mb-3">
              Total Orders
              <br />
              daily
            </div>
            <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">0 today</Badge>
          </CardContent>
        </Card>

        {/* Current Voucher */}
        <Card className="md:col-span-2 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-xl font-bold text-[#2563eb] mb-2">{user.currentVoucher.title}</div>
            <div className="text-gray-600 text-sm mb-4">{user.currentVoucher.description}</div>
            <div className="text-sm text-gray-500 mb-3">your current voucher</div>
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">{user.currentVoucher.discount}</Badge>
              <Button
                size="sm"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => setShowVoucherDialog(true)}
                disabled={user.currentVoucher.title === "No Voucher"}
              >
                use it
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Total Caffeine */}
        <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-[#2563eb] mb-2">{user.totalCaffeine} mg</div>
            <div className="text-gray-600 text-sm mb-3">Total caffein</div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">normal today</Badge>
          </CardContent>
        </Card>

        {/* User Level */}
        <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-[#2563eb] mb-2">you're</div>
            <div className="text-lg text-gray-600 mb-3">{user.level}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowLevelInfoDialog(true)}
              className="text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              what is?
            </Button>
          </CardContent>
        </Card>

        {/* Points Progress */}
        <Card className="md:col-span-2 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl font-bold text-[#2563eb]">you're points</div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPointsInfoDialog(true)}
                className="p-1 h-6 w-6 text-gray-400 hover:text-[#2563eb]"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {user.points}/{user.maxPoints} pts
            </div>
            <Progress value={(user.points / user.maxPoints) * 100} className="h-3 mb-4" />
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-100 text-[#2563eb] hover:bg-blue-100">
                {Math.round((user.points / user.maxPoints) * 100)}%
              </Badge>
              <Button
                size="sm"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => setShowSetGoalDialog(true)}
              >
                set goal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Caffeine Chart */}
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
                {caffeineData.map((data, index) => (
                  <div key={data.day} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-gradient-to-t from-[#2563eb] to-[#60a5fa] rounded-t-sm w-full transition-all duration-300 hover:opacity-80 min-h-[4px]"
                      style={{ height: `${Math.max((data.amount / 20) * 100, 4)}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-2 transform -rotate-0">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shake Voucher */}
        <Card className="md:col-span-1 lg:col-span-1 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-gray-600 mb-2">remaining {user.shakeAttempts}</div>
            <div className="text-xl font-bold text-[#2563eb] mb-4">
              shake it
              <br />
              voucher
            </div>
            <Button
              onClick={() => setShowShakeDialog(true)}
              disabled={user.shakeAttempts <= 0}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Shake
            </Button>
          </CardContent>
        </Card>

        {/* Redeem Reward */}
        <Card className="md:col-span-1 lg:col-span-2 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-gray-600 mb-2">points {user.points}</div>
            <div className="text-2xl font-bold text-[#2563eb] mb-4">
              Redeem
              <br />
              Reward
            </div>
            <Button
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              onClick={() => setShowRewardsDialog(true)}
            >
              View Rewards
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Points Info Dialog */}
      <Dialog open={showPointsInfoDialog} onOpenChange={setShowPointsInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <HelpCircle className="w-6 h-6 inline mr-2" />
              How to Get Points
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <Image
                src="/cat-thumbs-up.png"
                alt="Points Info"
                width={80}
                height={80}
                className="w-20 h-20 mx-auto mb-4"
              />
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#2563eb] mb-4 text-center">Earn Points by:</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                  <span>Making purchases over Rp 50,000 (earn 10 points)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                  <span>Completing daily caffeine goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                  <span>Participating in special promotions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2563eb] rounded-full"></div>
                  <span>Referring friends to Nefo Coffee</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowPointsInfoDialog(false)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Level Info Dialog */}
      <Dialog open={showLevelInfoDialog} onOpenChange={setShowLevelInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <HelpCircle className="w-6 h-6 inline mr-2" />
              Coffee Level Info
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <Image
                src="/cat-welcome.png"
                alt="Coffee Level"
                width={80}
                height={80}
                className="w-20 h-20 mx-auto mb-4"
              />
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
              <div className="text-xl font-bold text-[#2563eb] mb-3">The Curious Sipper</div>
              <p className="text-gray-700 leading-relaxed">
                The Curious Sipper is a beginner-level coffee drinker — someone who is just starting to explore the
                world of coffee. You're discovering new flavors, learning about different brewing methods, and
                developing your taste preferences. Keep exploring and earning points to unlock higher levels!
              </p>
            </div>

            <Button
              onClick={() => setShowLevelInfoDialog(false)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shake Dialog */}
      <Dialog open={showShakeDialog} onOpenChange={setShowShakeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Shake for Vouchers!</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Shake to reveal a voucher</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-sm text-gray-600">Attempts remaining:</div>
                <Badge variant="outline" className="text-[#2563eb] border-[#2563eb]">
                  {user.shakeAttempts}/3
                </Badge>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div
                  className={`w-48 h-48 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                    isShaking ? "animate-bounce scale-110" : "hover:scale-105"
                  }`}
                  onClick={handleShake}
                >
                  {isShaking ? (
                    <div className="text-center text-white">
                      <RotateCcw className="w-12 h-12 mx-auto mb-2 animate-spin" />
                      <div className="font-bold">Shaking...</div>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <Image
                        src="/cat-welcome.png"
                        alt="Shake Cat"
                        width={60}
                        height={60}
                        className="w-15 h-15 mx-auto mb-2"
                      />
                      <div className="font-bold text-lg">
                        {user.shakeAttempts > 0 ? "SHAKE ME!" : "No attempts left"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {user.shakeAttempts === 0 && (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Come back tomorrow for more shake attempts!</p>
                <Button
                  onClick={() => setUser((prev) => ({ ...prev, shakeAttempts: 3 }))}
                  variant="outline"
                  className="text-[#2563eb] border-[#2563eb]"
                >
                  Reset for Demo
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Result Dialog */}
      <Dialog open={showVoucherResult} onOpenChange={setShowVoucherResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">🎉 Voucher Found!</DialogTitle>
          </DialogHeader>

          {currentVoucher && (
            <div className="space-y-6">
              <div className="text-center">
                <Image
                  src="/cat-thumbs-up.png"
                  alt="Success Cat"
                  width={80}
                  height={80}
                  className="w-20 h-20 mx-auto mb-4"
                />
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-[#2563eb] mb-2">{currentVoucher.discount}</div>
                <div className="text-xl font-bold text-gray-900 mb-2">{currentVoucher.title}</div>
                <div className="text-gray-600">{currentVoucher.description}</div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleClaimVoucher} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                  Claim Voucher
                </Button>
                {user.shakeAttempts > 0 && (
                  <Button
                    onClick={handleShakeAgain}
                    variant="outline"
                    className="flex-1 text-[#2563eb] border-[#2563eb]"
                  >
                    Shake Again
                  </Button>
                )}
              </div>

              <div className="text-center text-sm text-gray-500">
                {user.shakeAttempts > 0 ? `${user.shakeAttempts} attempts remaining` : "No more attempts today"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rewards Dialog */}
      <Dialog open={showRewardsDialog} onOpenChange={setShowRewardsDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Gift className="w-6 h-6 inline mr-2" />
              Redeem Rewards
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600">Use your points to get amazing rewards!</p>
              <div className="text-lg font-bold text-[#2563eb] mt-2">Your Points: {user.points}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className={`${reward.available ? "" : "opacity-50"} border-0 shadow-lg`}>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 p-4 flex items-center justify-center">
                      <Image
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="font-bold text-[#2563eb] mb-2">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-[#2563eb] text-white">{reward.pointsCost} pts</Badge>
                      <Badge className={reward.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {reward.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => redeemReward(reward)}
                      disabled={!reward.available || user.points < reward.pointsCost || isRedeeming}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50"
                    >
                      {isRedeeming && redeemedReward?.id === reward.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Redeeming...
                        </>
                      ) : user.points >= reward.pointsCost && reward.available ? (
                        "Redeem"
                      ) : !reward.available ? (
                        "Unavailable"
                      ) : (
                        "Not enough pts"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Redeem Success Dialog */}
      <Dialog open={showRedeemSuccessDialog} onOpenChange={setShowRedeemSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              🎉 Redemption Successful!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">You've successfully redeemed:</h3>
              <div className="text-xl font-bold text-[#2563eb]">{redeemedReward?.name}</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
              <div className="text-sm text-gray-600 mb-2">Your Redeem ID:</div>
              <div className="text-2xl font-bold text-[#2563eb] mb-4">{redeemId}</div>
              <div className="text-sm text-gray-700">
                Please come to our store and show this ID to claim your reward!
              </div>
            </div>

            <Button
              onClick={() => setShowRedeemSuccessDialog(false)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Use Dialog */}
      <Dialog open={showVoucherDialog} onOpenChange={setShowVoucherDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Your Voucher</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <div className="text-3xl font-bold text-[#2563eb] mb-2">{user.currentVoucher.discount}</div>
                <div className="text-xl font-bold text-gray-900 mb-2">{user.currentVoucher.title}</div>
                <div className="text-gray-600 mb-4">{user.currentVoucher.description}</div>

                {/* Voucher ID */}
                <div className="text-sm text-gray-500 mb-2">Voucher ID:</div>
                <div className="font-mono text-lg font-bold text-[#2563eb] mb-4">{user.currentVoucher.id}</div>

                {/* Barcode */}
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-xs text-gray-500 mb-2">Show this barcode to cashier:</div>
                  <div className="flex justify-center">
                    <div className="bg-black text-white font-mono text-xs p-2 rounded">
                      |||||| |||| | |||| |||||| | |||| ||||||
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{user.currentVoucher.id}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowVoucherDialog(false)}
                variant="outline"
                className="flex-1 text-[#2563eb] border-[#2563eb]"
              >
                Close
              </Button>
              <Button
                onClick={handleDeleteVoucher}
                variant="outline"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Voucher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Goal Dialog */}
      <Dialog open={showSetGoalDialog} onOpenChange={setShowSetGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              <Target className="w-6 h-6 inline mr-2" />
              Set Points Goal
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Set your points goal to track your progress</p>
              <div className="text-sm text-gray-500">
                Current: {user.points} / {user.maxPoints} pts
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">New Goal (max 500 pts)</Label>
                <Input
                  id="goal"
                  type="number"
                  min="1"
                  max="500"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="text-center text-lg font-bold"
                />
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Preview:</div>
                <Progress value={(user.points / Number.parseInt(newGoal || "100")) * 100} className="h-3" />
                <div className="text-xs text-gray-500 mt-1">
                  {user.points} / {newGoal || user.maxPoints} pts (
                  {Math.round((user.points / Number.parseInt(newGoal || "100")) * 100)}%)
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowSetGoalDialog(false)}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSetGoal}
                disabled={!newGoal || Number.parseInt(newGoal) <= 0 || Number.parseInt(newGoal) > 500}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Set Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
