export interface ProfilePageProps {
  onLogout: () => void
}

export interface User {
  name: string
  email: string
  phone: string
  joinDate: string
  totalOrders: number
  favoriteOrder: string
  points: number
  level: number
  profileImage: string
}

export interface Redemption {
  id: string
  rewardName: string
  pointsCost: number
  date: string
  status: "pending" | "completed" | "cancelled"
} 