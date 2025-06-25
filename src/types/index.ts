// User Types
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  joinDate?: string
  totalOrders?: number
  favoriteOrder?: string
  points: number
  level?: number
  profileImage?: string
  totalCups: number
  locked: boolean
  vouchers?: Voucher[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "reward" | "order" | "promotion" | "system"
  date: string
  read: boolean
}

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

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "process" | "processing" | "completed" | "cancelled"
  date: string
  paymentMethod?: string
  type?: "online" | "offline"
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

export interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  options?: {
    size?: string
    ice?: string
    sugar?: string
    toppings?: string[]
  }
}

export interface MenuItem {
  id: string | number
  name: string
  description?: string
  price: string | number
  image?: string
  category?: "signature" | "nonCoffee" | "snacks"
  popular?: boolean
  isDraft?: boolean
}

// Admin Types
export interface AdminDashboardStats {
  monthlyOrders: number
  dailyOrders: number
  totalUsers: number
  activeVouchers: number
  activeRewards: number
  totalRevenue: number
}

export interface AdminOrdersProps {
  searchTerm?: string
  statusFilter?: "all" | "pending" | "process" | "completed" | "cancelled"
}

export const statusLabels = {
  all: "All Orders",
  pending: "Pending",
  process: "In Process",
  completed: "Completed",
  cancelled: "Cancelled",
} as const

export interface AdminMenuProps {
  searchTerm?: string
  menuFilter?: "all" | "published" | "draft"
  menuCategory?: "signature" | "nonCoffee" | "snacks"
}

export interface AdminRedemptionsProps {
  searchTerm?: string
  redemptionFilter?: "all" | "pending" | "completed" | "cancelled"
}

export interface AdminMenuItem extends MenuItem {
  isAvailable: boolean
  stock?: number
}

export interface Voucher {
  id: number
  title: string
  discount: string
  description?: string
  active: boolean
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

export interface NotificationCategory {
  id: string
  name: string
  icon: any // TODO: Find proper type for Lucide icons
  color: string
}

export interface CaffeineData {
  day: string
  amount: number
}

export interface SalesData {
  day: string
  sales: number
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  options?: {
    size?: string
    ice?: string
    sugar?: string
    toppings?: string[]
  }
}

// Component Props
export interface OrderCardProps {
  order: Order
  countdown?: number
  onView: (order: Order) => void
  onProcess: (orderId: string) => void
  onComplete: (orderId: string) => void
  onCancel: (orderId: string) => void
  onDelete: (orderId: string) => void
}

export interface OrderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order
}

export interface CartSectionProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onApplyVoucher: (code: string) => void
  onCheckout: () => void
}

export interface MenuSectionProps {
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
}

export interface OrderPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  total: number
  appliedVoucher?: Voucher
}

export interface StatsGridProps {
  stats: AdminDashboardStats
}

export interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddItem: (item: MenuItem) => void
}

export interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface UserSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectUser: (user: User) => void
}

export interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User
}

export interface EditItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
  onEditItem: (item: MenuItem) => void
}

export interface VoucherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  voucher?: Voucher
}

export interface RedemptionPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface RedemptionCardProps {
  redemption: Redemption
  onViewDetails: (redemption: Redemption) => void
}

export interface RedemptionDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  redemption: Redemption
}

export interface ManagementCardsProps {
  stats: AdminDashboardStats
}

export interface RewardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reward?: Reward
}

export interface AdminProfileProps {
  user: User
} 