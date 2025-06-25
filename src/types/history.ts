import { CartItem } from "./menu"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: Date
  status: "pending" | "process" | "completed" | "cancelled"
  type: "online" | "offline"
  customerName?: string
  customerEmail?: string
  customerPhone?: string
}

export type OrderStatus = "pending" | "process" | "completed" | "cancelled" 