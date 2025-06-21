"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Coffee, Star, Gift, Zap, Trophy, Target, Coins, X, RotateCcw, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  name: string
  email: string
  points: number
  caffeineToday: number
  caffeineGoal: number
  totalPurchases: number
  level: number
  vouchers: Voucher[]
  shakeAttempts: number
}

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

const demoUser: User = {
  name: "Coffee Lover",
  email: "demo@nefocoffee.com",
  points: 450,
  caffeineToday: 180,
  caffeineGoal: 400,
  totalPurchases: 12,
  level: 3,
  vouchers: [
    {
      id: "1",
      title: "Nefo Original",
      discount: "20%",
      description: "Get 20% off your next Nefo Original",
      claimed: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ],
  shakeAttempts: 3,
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
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
  {
    id: "2",
    name: "Nefo Tumbler",
    description: "Exclusive Nefo Coffee tumbler",
    pointsCost: 150,
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
  {
    id: "3",
    name: "Coffee Beans 250g",
    description: "Premium coffee beans to take home",
    pointsCost: 200,
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
  {
    id: "4",
    name: "VIP Member",
    description: "1 month VIP membership with exclusive perks",
    pointsCost: 500,
    image: "/placeholder.svg?height=100&width=100",
    available: false,
  },
]

interface UserDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserDashboard({ isOpen, onClose }: UserDashboardProps) {
  const { toast } = useToast()
  const [user, setUser] = useState<User>(demoUser)
  const [activeTab, setActiveTab] = useState<"overview" | "shake" | "rewards">("overview")
  const [isShaking, setIsShaking] = useState(false)
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null)
  const [showVoucherResult, setShowVoucherResult] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null)

  const caffeinePercentage = (user.caffeineToday / user.caffeineGoal) * 100
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
        vouchers: [...prev.vouchers, { ...currentVoucher, claimed: false }],
      }))
      setCurrentVoucher(null)
      setShowVoucherResult(false)
    }
  }

  const handleShakeAgain = () => {
    setCurrentVoucher(null)
    setShowVoucherResult(false)
  }

  const addCaffeine = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      caffeineToday: Math.min(prev.caffeineToday + amount, prev.caffeineGoal),
      points: prev.points + Math.floor(amount / 50) * 10,
    }))
  }

  const redeemReward = async (reward: Reward) => {
    if (user.points >= reward.pointsCost && reward.available) {
      setIsRedeeming(reward.id)

      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate redemption ID
      const redemptionId = `RDM-${Date.now()}`

      // Create redemption record
      const redemption = {
        id: redemptionId,
        userId: user.email,
        userName: user.name,
        rewardId: reward.id,
        rewardName: reward.name,
        pointsCost: reward.pointsCost,
        date: new Date().toISOString(),
        status: "pending",
      }

      // Save to localStorage for admin
      const existingRedemptions = JSON.parse(localStorage.getItem("userRedemptions") || "[]")
      localStorage.setItem("userRedemptions", JSON.stringify([redemption, ...existingRedemptions]))

      // Deduct points
      setUser((prev) => ({
        ...prev,
        points: prev.points - reward.pointsCost,
      }))

      setIsRedeeming(null)

      // Show success toast
      toast({
        variant: "success",
        title: "Redemption Successful! 🎉",
        description: `Your ${reward.name} has been redeemed! Come to our store and show redemption ID: ${redemptionId}`,
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#f5f5f0] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#2563eb] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Image src="/cat-thumbs-up.png" alt="User Avatar" width={40} height={40} className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-100">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Level {user.level}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4" />
                  <span className="font-bold">{user.points} pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === "overview"
                ? "text-[#2563eb] border-b-2 border-[#2563eb] bg-white"
                : "text-gray-600 hover:text-[#2563eb]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("shake")}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === "shake"
                ? "text-[#2563eb] border-b-2 border-[#2563eb] bg-white"
                : "text-gray-600 hover:text-[#2563eb]"
            }`}
          >
            Shake Voucher
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === "rewards"
                ? "text-[#2563eb] border-b-2 border-[#2563eb] bg-white"
                : "text-gray-600 hover:text-[#2563eb]"
            }`}
          >
            Redeem Rewards
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                  <CardContent className="p-4 text-center">
                    <Coffee className="w-8 h-8 text-[#2563eb] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#2563eb]">{user.totalPurchases}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-[#2563eb] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#2563eb]">{user.points}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-[#2563eb] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#2563eb]">Level {user.level}</div>
                    <div className="text-sm text-gray-600">Coffee Master</div>
                  </CardContent>
                </Card>
              </div>

              {/* Caffeine Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-[#2563eb]" />
                    <span>Daily Caffeine Tracker</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's Intake</span>
                    <span className="font-bold">
                      {user.caffeineToday}mg / {user.caffeineGoal}mg
                    </span>
                  </div>
                  <Progress value={caffeinePercentage} className="h-3" />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => addCaffeine(95)} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                      +95mg (Espresso)
                    </Button>
                    <Button size="sm" onClick={() => addCaffeine(150)} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                      +150mg (Coffee)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-[#2563eb]" />
                    <span>Level Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress to Level {user.level + 1}</span>
                    <span className="font-bold">{user.points % 100}/100 pts</span>
                  </div>
                  <Progress value={levelProgress} className="h-3" />
                </CardContent>
              </Card>

              {/* Active Vouchers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-[#2563eb]" />
                    <span>Active Vouchers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.vouchers.length > 0 ? (
                    <div className="space-y-3">
                      {user.vouchers.map((voucher) => (
                        <div
                          key={voucher.id}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg"
                        >
                          <div>
                            <div className="font-bold text-[#2563eb]">{voucher.title}</div>
                            <div className="text-sm text-gray-600">{voucher.description}</div>
                          </div>
                          <Badge className="bg-green-500 text-white">{voucher.discount}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Gift className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No active vouchers</p>
                      <p className="text-sm">Try the shake voucher feature!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "shake" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#2563eb] mb-2">Shake for Vouchers!</h3>
                <p className="text-gray-600 mb-4">Shake your phone or click the button to reveal a voucher</p>
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
                    className={`w-64 h-64 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
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
                          width={80}
                          height={80}
                          className="w-20 h-20 mx-auto mb-2"
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
          )}

          {activeTab === "rewards" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#2563eb] mb-2">Redeem Rewards</h3>
                <p className="text-gray-600">Use your points to get amazing rewards!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`${reward.available ? "" : "opacity-50"}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-bold text-[#2563eb]">{reward.name}</h4>
                            <Badge
                              className={reward.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {reward.available ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#2563eb] text-white">{reward.pointsCost} pts</Badge>
                            <Button
                              size="sm"
                              onClick={() => redeemReward(reward)}
                              disabled={
                                !reward.available || user.points < reward.pointsCost || isRedeeming === reward.id
                              }
                              className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                            >
                              {isRedeeming === reward.id ? (
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
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
    </div>
  )
}
