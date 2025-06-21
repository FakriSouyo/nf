"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, ChevronDown } from "lucide-react"
import MenuItemCard from "./menu/menu-item-card"
import AddItemDialog from "./menu/add-item-dialog"
import EditItemDialog from "./menu/edit-item-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: "signature" | "nonCoffee" | "snacks"
  popular: boolean
  isDraft: boolean
}

// Demo data
const initialMenuItems: MenuItem[] = [
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
]

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [activeCategory, setActiveCategory] = useState<"signature" | "nonCoffee" | "snacks">("signature")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  const filteredItems = menuItems
    .filter((item) => item.category === activeCategory)
    .filter((item) => {
      switch (filter) {
        case "published":
          return !item.isDraft
        case "draft":
          return item.isDraft
        default:
          return true
      }
    })

  const handleAddItem = (newItem: Omit<MenuItem, "id">) => {
    const id = (menuItems.length + 1).toString()
    setMenuItems([...menuItems, { ...newItem, id }])
    setAddDialogOpen(false)
  }

  const handleEditItem = (id: string, updatedItem: Omit<MenuItem, "id">) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...updatedItem, id } : item)))
    setEditDialogOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id))
    }
  }

  const categoryLabels = {
    signature: "Signature Coffee",
    nonCoffee: "Non Coffee",
    snacks: "Snacks",
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Menu Management</h1>
        <Image src="/cat-thumbs-up.png" alt="Menu Cat" width={40} height={40} className="w-10 h-10" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px] justify-between">
                  {filter === "all" ? "All Items" : filter === "published" ? "Published" : "Drafts"}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("all")}>All Items</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("draft")}>Drafts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[150px] justify-between">
                  {categoryLabels[activeCategory]}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveCategory("signature")}>
                  Signature Coffee
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveCategory("nonCoffee")}>
                  Non Coffee
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveCategory("snacks")}>
                  Snacks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            onClick={() => setAddDialogOpen(true)}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={() => {
                setSelectedItem(item)
                setEditDialogOpen(true)
              }}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
        </div>

        <AddItemDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddItem={handleAddItem}
        />

        <EditItemDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          item={selectedItem}
          onEditItem={handleEditItem}
        />
      </div>
    </div>
  )
}
