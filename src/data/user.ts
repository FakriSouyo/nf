import { User, Order, Redemption, Notification } from "@/types"

// Demo user data
export const demoUser: User = {
  id: 1,
  name: "Coffee Lover",
  email: "demo@nefocoffee.com",
  phone: "+62 123 456 7890",
  joinDate: "January 2024",
  totalOrders: 47,
  favoriteOrder: "Nefo Original",
  points: 450,
  level: 3,
  profileImage: "/cat-thumbs-up.png",
}

// Demo notifications
export const demoNotifications: Notification[] = [
  {
    id: "1",
    title: "New Reward Available!",
    message: "You've earned enough points for a free coffee! Check out the rewards section.",
    type: "reward",
    date: "2024-03-20T08:30:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Welcome to Nefo Coffee!",
    message: "Thanks for joining us! Enjoy your coffee journey with exclusive perks and rewards.",
    type: "system",
    date: "2024-03-19T08:30:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Special Promotion",
    message: "Get 20% off on all signature drinks this weekend! Don't miss out.",
    type: "promotion",
    date: "2024-03-17T08:30:00Z",
    read: true,
  },
]

// Demo redemptions
export const demoRedemptions: Redemption[] = [
  {
    id: "RDM-2024-001",
    userId: "user-001",
    userName: "Coffee Lover",
    rewardId: "reward-001",
    rewardName: "Free Coffee",
    pointsCost: 100,
    date: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "RDM-2024-002",
    userId: "user-001",
    userName: "Coffee Lover",
    rewardId: "reward-002",
    rewardName: "Nefo Tumbler",
    pointsCost: 150,
    date: "2024-01-10T14:20:00Z",
    status: "pending",
  },
  {
    id: "RDM-2024-003",
    userId: "user-001",
    userName: "Coffee Lover",
    rewardId: "reward-003",
    rewardName: "Coffee Beans 250g",
    pointsCost: 200,
    date: "2024-01-05T09:15:00Z",
    status: "completed",
  },
]

// Sample orders for history
export const sampleOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { id: 1, name: "Nefo Original", price: 18000, quantity: 2 },
      { id: 2, name: "Croissant", price: 15000, quantity: 1 },
    ],
    total: 51000,
    date: "2024-03-10T14:30:00",
    status: "pending",
    type: "online",
  },
  {
    id: "ORD002",
    items: [
      { id: 3, name: "Matcha Latte", price: 22000, quantity: 1 },
      { id: 4, name: "Chocolate Brownie", price: 18000, quantity: 2 },
    ],
    total: 58000,
    date: "2024-03-09T16:45:00",
    status: "completed",
    type: "offline",
  },
] 