export interface Voucher {
  id: string
  title: string
  discount: string
  description: string
  claimed?: boolean
  expiresAt?: Date
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  image: string
  available: boolean
}

export interface CaffeineData {
  day: string
  amount: number
}

export interface UserData {
  name: string
  monthlyOrders: number
  dailyOrders: number
  totalCaffeine: number
  caffeineGoal: number
  points: number
  maxPoints: number
  level: string
  shakeAttempts: number
  currentVoucher: Voucher
} 