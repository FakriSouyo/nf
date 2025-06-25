import { MenuItem } from "@/types"

export const menuItems: MenuItem[] = [
  // Signature Coffee
  { id: 1, name: "Nefo Original", price: 8000, category: "signature" },
  { id: 2, name: "Caramel Macchiato", price: 12000, category: "signature" },
  { id: 3, name: "Nefo Special", price: 15000, category: "signature" },
  { id: 9, name: "Espresso Shot", price: 6000, category: "signature" },
  { id: 10, name: "Cappuccino Classic", price: 14000, category: "signature" },
  { id: 11, name: "Mocha Delight", price: 16000, category: "signature" },
  { id: 12, name: "Americano Bold", price: 10000, category: "signature" },
  { id: 13, name: "Latte Art", price: 18000, category: "signature" },
  { id: 14, name: "Flat White", price: 17000, category: "signature" },
  { id: 15, name: "Ristretto", price: 7000, category: "signature" },
  
  // Non Coffee
  { id: 4, name: "Velly", price: 15000, category: "nonCoffee" },
  { id: 5, name: "Matcha Latte", price: 18000, category: "nonCoffee" },
  { id: 6, name: "Chocolate Frappe", price: 20000, category: "nonCoffee" },
  { id: 16, name: "Strawberry Smoothie", price: 22000, category: "nonCoffee" },
  { id: 17, name: "Mango Tango", price: 19000, category: "nonCoffee" },
  { id: 18, name: "Vanilla Milkshake", price: 16000, category: "nonCoffee" },
  { id: 19, name: "Blueberry Blast", price: 24000, category: "nonCoffee" },
  { id: 20, name: "Pineapple Paradise", price: 21000, category: "nonCoffee" },
  { id: 21, name: "Coconut Dream", price: 18000, category: "nonCoffee" },
  { id: 22, name: "Banana Boost", price: 17000, category: "nonCoffee" },
  
  // Snacks
  { id: 7, name: "Croissant", price: 8000, category: "snacks" },
  { id: 8, name: "Cheesecake", price: 25000, category: "snacks" },
  { id: 23, name: "Chocolate Brownie", price: 12000, category: "snacks" },
  { id: 24, name: "Tiramisu", price: 28000, category: "snacks" },
  { id: 25, name: "Blueberry Muffin", price: 9000, category: "snacks" },
  { id: 26, name: "Chocolate Chip Cookie", price: 6000, category: "snacks" },
  { id: 27, name: "Apple Pie", price: 15000, category: "snacks" },
  { id: 28, name: "Strawberry Tart", price: 18000, category: "snacks" },
  { id: 29, name: "Cinnamon Roll", price: 11000, category: "snacks" },
  { id: 30, name: "Lemon Cake", price: 14000, category: "snacks" },
]

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