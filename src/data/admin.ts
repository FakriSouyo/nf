import { Order, MenuItem, User, Voucher, Reward, Redemption, NotificationCategory, SalesData } from "@/types"
import { Star, Gift, Bell } from "lucide-react"

// Demo menu items
export const demoMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Strong black coffee in small serving",
    price: "18000",
    image: "/menu/espresso.jpg",
    category: "signature",
    popular: true,
    isDraft: false,
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "Espresso with steamed milk foam",
    price: "25000",
    image: "/menu/cappuccino.jpg",
    category: "signature",
    popular: true,
    isDraft: false,
  },
  {
    id: "3",
    name: "Green Tea Latte",
    description: "Japanese matcha with steamed milk",
    price: "23000",
    image: "/menu/green-tea.jpg",
    category: "nonCoffee",
    popular: false,
    isDraft: false,
  },
  {
    id: "4",
    name: "Croissant",
    description: "Buttery, flaky pastry",
    price: "15000",
    image: "/menu/croissant.jpg",
    category: "snacks",
    popular: true,
    isDraft: false,
  },
  {
    id: "5",
    name: "Caramel Macchiato",
    description: "Sweet caramel with espresso",
    price: "28000",
    image: "/menu/caramel-macchiato.jpg",
    category: "signature",
    popular: true,
    isDraft: false,
  },
  {
    id: "6",
    name: "Americano",
    description: "Espresso with hot water",
    price: "20000",
    image: "/menu/americano.jpg",
    category: "signature",
    popular: false,
    isDraft: false,
  },
  {
    id: "7",
    name: "Mocha",
    description: "Chocolate and coffee blend",
    price: "30000",
    image: "/menu/mocha.jpg",
    category: "signature",
    popular: true,
    isDraft: false,
  },
  {
    id: "8",
    name: "Latte",
    description: "Smooth espresso with steamed milk",
    price: "26000",
    image: "/menu/latte.jpg",
    category: "signature",
    popular: false,
    isDraft: false,
  },
  {
    id: "9",
    name: "Flat White",
    description: "Australian coffee style",
    price: "27000",
    image: "/menu/flat-white.jpg",
    category: "signature",
    popular: false,
    isDraft: false,
  },
]

// Demo users for admin dashboard
export const demoUsers: User[] = [
  { id: 1, name: "Coffee Lover", email: "demo@nefocoffee.com", totalCups: 47, points: 85, locked: true },
  { id: 2, name: "John Doe", email: "john@example.com", totalCups: 23, points: 45, locked: true },
  { id: 3, name: "Jane Smith", email: "jane@example.com", totalCups: 31, points: 62, locked: true },
]

// Demo vouchers for admin dashboard
export const demoVouchers: Voucher[] = [
  { id: 1, title: "Nefo Original", discount: "20%", active: true },
  { id: 2, title: "Caramel Macchiato", discount: "15%", active: true },
  { id: 3, title: "Free Upgrade", discount: "FREE", active: false },
]

// Demo rewards for admin dashboard
export const demoRewards: Reward[] = [
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
]

// Sample sales data for the chart
export const salesData: SalesData[] = [
  { day: "Mon", sales: 850000 },
  { day: "Tue", sales: 1200000 },
  { day: "Wed", sales: 950000 },
  { day: "Thu", sales: 1500000 },
  { day: "Fri", sales: 1800000 },
  { day: "Sat", sales: 2200000 },
  { day: "Sun", sales: 1600000 },
]

// Demo redemptions for admin
export const demoRedemptions: Redemption[] = [
  {
    id: "RED001",
    userId: "coffee.lover@email.com",
    userName: "Coffee Lover",
    rewardId: "REW001",
    rewardName: "Free Nefo Original",
    pointsCost: 100,
    date: "2024-03-20T10:30:00",
    status: "pending"
  },
  {
    id: "RED002",
    userId: "john.doe@email.com",
    userName: "John Doe",
    rewardId: "REW002",
    rewardName: "Free Size Upgrade",
    pointsCost: 150,
    date: "2024-03-19T14:15:00",
    status: "completed"
  },
  // Add more redemptions as needed...
]

// Demo orders for admin
export const demoOrders: Order[] = [
  {
    id: "ORD001",
    items: [
      { id: 1, name: "Signature Latte", price: 28000, quantity: 2 },
      { id: 2, name: "Croissant", price: 15000, quantity: 1 },
    ],
    total: 71000,
    date: new Date("2024-03-20T09:30:00"),
    status: "pending",
    type: "online",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+62812345678",
  },
  {
    id: "ORD002",
    items: [
      { id: 3, name: "Americano", price: 22000, quantity: 1 },
      { id: 4, name: "Chocolate Cake", price: 25000, quantity: 2 },
    ],
    total: 72000,
    date: new Date("2024-03-20T10:15:00"),
    status: "process",
    type: "offline",
  },
  // Add more orders as needed...
]

// Notification categories
export const notificationCategories: NotificationCategory[] = [
  { id: "promotion", name: "Promotion", icon: Star, color: "text-orange-600" },
  { id: "reward", name: "Reward", icon: Gift, color: "text-green-600" },
  { id: "system", name: "System", icon: Bell, color: "text-gray-600" },
]

// Registered users for cashier
export const registeredUsers = [
  {
    id: 1,
    name: "Coffee Lover",
    email: "demo@nefocoffee.com",
    points: 450,
    vouchers: [
      {
        id: "NEFO2024001",
        title: "Nefo Original",
        discount: "20%",
        description: "Get 20% off your next Nefo Original",
      },
      { id: "NEFO2024002", title: "Free Upgrade", discount: "FREE", description: "Free size upgrade on any drink" },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    points: 45,
    vouchers: [
      {
        id: "NEFO2024003",
        title: "Caramel Macchiato",
        discount: "15%",
        description: "15% discount on Caramel Macchiato",
      },
    ],
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    points: 62,
    vouchers: [],
  },
  {
    id: 4,
    name: "Walk-in Customer",
    email: "N/A",
    points: 0,
    vouchers: [],
  },
] 