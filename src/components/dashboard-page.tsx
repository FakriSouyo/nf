"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

// Components
import DashboardHeader from "@/components/user/dashboard/dashboard-header"
import StatCard from "@/components/user/dashboard/stat-card"
import VoucherCard from "@/components/user/dashboard/voucher-card"
import PointsCard from "@/components/user/dashboard/points-card"
import CaffeineChart from "@/components/user/dashboard/caffeine-chart"
import ShakeVoucherCard from "@/components/user/dashboard/shake-voucher-card"
import RewardsCard from "@/components/user/dashboard/rewards-card"

// Dialog Components
import PointsInfoDialog from "@/components/user/dashboard/dialogs/points-info-dialog"
import LevelInfoDialog from "@/components/user/dashboard/dialogs/level-info-dialog"
import ShakeDialog from "@/components/user/dashboard/dialogs/shake-dialog"
import VoucherResultDialog from "@/components/user/dashboard/dialogs/voucher-result-dialog"
import RewardsDialog from "@/components/user/dashboard/dialogs/rewards-dialog"
import RedeemSuccessDialog from "@/components/user/dashboard/dialogs/redeem-success-dialog"
import VoucherUseDialog from "@/components/user/dashboard/dialogs/voucher-use-dialog"
import SetGoalDialog from "@/components/user/dashboard/dialogs/set-goal-dialog"

// Types and Sample Data
import { UserData, Voucher, Reward } from "@/types/dashboard"
import { availableVouchers, caffeineData } from "@/data/dashboard-sample"

export default function DashboardPage() {
  const { toast } = useToast()
  const [user, setUser] = useState<UserData>({
    name: "Coffee Lover",
    monthlyOrders: 12,
    dailyOrders: 1,
    totalCaffeine: 40,
    caffeineGoal: 100,
    points: 450,
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

  // Dialog States
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

  // Handlers
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
          id: `NEFO2024${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
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

  const handleRedeemReward = async (reward: Reward) => {
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

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader userName={user.name} />

        {/* Monthly Orders */}
        <StatCard
          value={`${user.monthlyOrders} cups`}
          label="Total Orders"
          sublabel="Monthly"
          badgeText="+2 this month"
        />

        {/* Daily Orders */}
        <StatCard
          value={`${user.dailyOrders} cups`}
          label="Total Orders"
          sublabel="daily"
          badgeText="0 today"
        />

        {/* Current Voucher */}
        <VoucherCard voucher={user.currentVoucher} onUse={() => setShowVoucherDialog(true)} />

        {/* Total Caffeine */}
        <StatCard
          value={`${user.totalCaffeine} mg`}
          label="Total caffein"
          badgeText="normal today"
          badgeVariant="success"
        />

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
        <PointsCard
          points={user.points}
          maxPoints={user.maxPoints}
          onSetGoal={() => setShowSetGoalDialog(true)}
          onInfoClick={() => setShowPointsInfoDialog(true)}
        />

        {/* Caffeine Chart */}
        <CaffeineChart data={caffeineData} />

        {/* Shake Voucher */}
        <ShakeVoucherCard
          attempts={user.shakeAttempts}
          onShake={() => setShowShakeDialog(true)}
          isShaking={isShaking}
        />

        {/* Redeem Reward */}
        <RewardsCard points={user.points} onViewRewards={() => setShowRewardsDialog(true)} />
      </div>

      {/* Dialogs */}
      <PointsInfoDialog open={showPointsInfoDialog} onOpenChange={setShowPointsInfoDialog} />
      <LevelInfoDialog open={showLevelInfoDialog} onOpenChange={setShowLevelInfoDialog} />
      <ShakeDialog
        open={showShakeDialog}
        onOpenChange={setShowShakeDialog}
        attempts={user.shakeAttempts}
        isShaking={isShaking}
        onShake={handleShake}
        onResetDemo={() => setUser((prev) => ({ ...prev, shakeAttempts: 3 }))}
      />
      <VoucherResultDialog
        open={showVoucherResult}
        onOpenChange={setShowVoucherResult}
        currentVoucher={currentVoucher}
        attempts={user.shakeAttempts}
        onClaim={handleClaimVoucher}
        onShakeAgain={handleShakeAgain}
      />
      <RewardsDialog
        open={showRewardsDialog}
        onOpenChange={setShowRewardsDialog}
        userPoints={user.points}
        isRedeeming={isRedeeming}
        redeemedReward={redeemedReward}
        onRedeem={handleRedeemReward}
      />
      <RedeemSuccessDialog
        open={showRedeemSuccessDialog}
        onOpenChange={setShowRedeemSuccessDialog}
        redeemedReward={redeemedReward}
        redeemId={redeemId}
      />
      <VoucherUseDialog
        open={showVoucherDialog}
        onOpenChange={setShowVoucherDialog}
        voucher={user.currentVoucher}
        onDelete={handleDeleteVoucher}
      />
      <SetGoalDialog
        open={showSetGoalDialog}
        onOpenChange={setShowSetGoalDialog}
        currentPoints={user.points}
        maxPoints={user.maxPoints}
        newGoal={newGoal}
        onNewGoalChange={setNewGoal}
        onSetGoal={handleSetGoal}
      />
    </div>
  )
}
