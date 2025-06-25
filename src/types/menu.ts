export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  popular: boolean
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface MenuCategories {
  signature: MenuItem[]
  nonCoffee: MenuItem[]
  snacks: MenuItem[]
}

export type CategoryType = "signature" | "nonCoffee" | "snacks"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: Date
  status: "pending" | "completed" | "cancelled"
  type: "offline" | "online"
} 