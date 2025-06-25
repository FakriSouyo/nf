export interface Redemption {
  id: string
  userId: string
  userName: string
  rewardId: string
  rewardName: string
  pointsCost: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

export interface AdminRedemptionsProps {
  redemptionFilter?: "all" | "pending" | "completed" | "cancelled"
}

export const statusLabels = {
  all: "All Redemptions",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
} as const 