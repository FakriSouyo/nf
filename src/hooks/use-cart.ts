import { useState } from "react"
import { CartItem, MenuItem } from "@/types/menu"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
      } else {
        return prev.filter((item) => item.id !== itemId)
      }
    })
  }

  const getCartItemQuantity = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    getCartItemQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  }
} 