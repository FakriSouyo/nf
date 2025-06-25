import { Reward, Voucher, CaffeineData } from "@/types/dashboard"

export const availableVouchers: Partial<Voucher>[] = [
  { title: "Nefo Original", discount: "20%", description: "Get 20% off your next Nefo Original" },
  { title: "Caramel Macchiato", discount: "15%", description: "15% discount on Caramel Macchiato" },
  { title: "Velly", discount: "25%", description: "25% off Red Velvet special" },
  { title: "Free Upgrade", discount: "FREE", description: "Free size upgrade on any drink" },
  { title: "Buy 1 Get 1", discount: "BOGO", description: "Buy one get one free on signature drinks" },
  { title: "Matcha Latte", discount: "30%", description: "30% off premium Matcha Latte" },
]

export const rewards: Reward[] = [
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

export const caffeineData: CaffeineData[] = [
  { day: "Mon", amount: 8 },
  { day: "Tue", amount: 12 },
  { day: "Wed", amount: 5 },
  { day: "Thu", amount: 15 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
] 