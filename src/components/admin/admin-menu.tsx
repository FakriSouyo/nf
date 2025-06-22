"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import MenuItemCard from "./menu/menu-item-card"
import AddItemDialog from "./menu/add-item-dialog"
import EditItemDialog from "./menu/edit-item-dialog"
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog"

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

interface AdminMenuProps {
  searchTerm?: string
  statusFilter?: string
  menuFilter?: "all" | "published" | "draft"
  menuCategory?: "signature" | "nonCoffee" | "snacks"
  redemptionFilter?: string
  addDialogOpen?: boolean
  setAddDialogOpen?: (open: boolean) => void
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
  {
    id: "10",
    name: "Ristretto",
    description: "Concentrated espresso shot",
    price: "16000",
    image: "/menu/ristretto.jpg",
    category: "signature",
    popular: false,
    isDraft: false,
  },
  {
    id: "11",
    name: "Strawberry Smoothie",
    description: "Fresh strawberry blend",
    price: "32000",
    image: "/menu/strawberry-smoothie.jpg",
    category: "nonCoffee",
    popular: true,
    isDraft: false,
  },
  {
    id: "12",
    name: "Mango Tango",
    description: "Tropical mango delight",
    price: "29000",
    image: "/menu/mango-tango.jpg",
    category: "nonCoffee",
    popular: false,
    isDraft: false,
  },
  {
    id: "13",
    name: "Vanilla Milkshake",
    description: "Creamy vanilla goodness",
    price: "26000",
    image: "/menu/vanilla-milkshake.jpg",
    category: "nonCoffee",
    popular: false,
    isDraft: false,
  },
  {
    id: "14",
    name: "Blueberry Blast",
    description: "Antioxidant rich smoothie",
    price: "34000",
    image: "/menu/blueberry-blast.jpg",
    category: "nonCoffee",
    popular: true,
    isDraft: false,
  },
  {
    id: "15",
    name: "Pineapple Paradise",
    description: "Refreshing pineapple drink",
    price: "31000",
    image: "/menu/pineapple-paradise.jpg",
    category: "nonCoffee",
    popular: false,
    isDraft: false,
  },
  {
    id: "16",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie",
    price: "22000",
    image: "/menu/chocolate-brownie.jpg",
    category: "snacks",
    popular: true,
    isDraft: false,
  },
  {
    id: "17",
    name: "Tiramisu",
    description: "Italian coffee dessert",
    price: "38000",
    image: "/menu/tiramisu.jpg",
    category: "snacks",
    popular: true,
    isDraft: false,
  },
  {
    id: "18",
    name: "Blueberry Muffin",
    description: "Fresh blueberry muffin",
    price: "19000",
    image: "/menu/blueberry-muffin.jpg",
    category: "snacks",
    popular: false,
    isDraft: false,
  },
  {
    id: "19",
    name: "Chocolate Chip Cookie",
    description: "Classic chocolate chip cookie",
    price: "16000",
    image: "/menu/chocolate-chip-cookie.jpg",
    category: "snacks",
    popular: false,
    isDraft: false,
  },
  {
    id: "20",
    name: "Apple Pie",
    description: "Homemade apple pie",
    price: "25000",
    image: "/menu/apple-pie.jpg",
    category: "snacks",
    popular: false,
    isDraft: false,
  },
  {
    id: "21",
    name: "Strawberry Tart",
    description: "Fresh strawberry tart",
    price: "28000",
    image: "/menu/strawberry-tart.jpg",
    category: "snacks",
    popular: true,
    isDraft: false,
  },
  {
    id: "22",
    name: "Cinnamon Roll",
    description: "Warm cinnamon roll",
    price: "21000",
    image: "/menu/cinnamon-roll.jpg",
    category: "snacks",
    popular: false,
    isDraft: false,
  },
  {
    id: "23",
    name: "Lemon Cake",
    description: "Zesty lemon cake",
    price: "24000",
    image: "/menu/lemon-cake.jpg",
    category: "snacks",
    popular: false,
    isDraft: false,
  },
  {
    id: "24",
    name: "Cheesecake",
    description: "Creamy New York style",
    price: "35000",
    image: "/menu/cheesecake.jpg",
    category: "snacks",
    popular: true,
    isDraft: false,
  },
]

export default function AdminMenu({
  searchTerm = "",
  statusFilter = "all",
  menuFilter = "all",
  menuCategory = "signature",
  redemptionFilter = "all",
  addDialogOpen = false,
  setAddDialogOpen
}: AdminMenuProps) {
  const { toast } = useToast()
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)

  // Use the prop if provided, otherwise use local state
  const isAddDialogOpen = setAddDialogOpen ? addDialogOpen : false
  const handleAddDialogChange = setAddDialogOpen || (() => {})

  const filteredItems = menuItems
    .filter((item) => item.category === menuCategory)
    .filter((item) => {
      switch (menuFilter) {
        case "published":
          return !item.isDraft
        case "draft":
          return item.isDraft
        default:
          return true
      }
    })
    .filter((item) => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  // Show toast when category or filter changes
  useEffect(() => {
    // Removed toast notifications for filter and category changes
  }, [menuFilter, toast])

  useEffect(() => {
    // Removed toast notifications for category changes
  }, [menuCategory, toast])

  const handleAddItem = (newItem: Omit<MenuItem, "id">) => {
    const id = (menuItems.length + 1).toString()
    setMenuItems([...menuItems, { ...newItem, id }])
    if (setAddDialogOpen) {
      setAddDialogOpen(false)
    }
    
    toast({
      variant: "success",
      title: "Menu Item Added",
      description: `${newItem.name} has been added to the menu successfully.`,
    })
  }

  const handleEditItem = (id: string, updatedItem: Omit<MenuItem, "id">) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...updatedItem, id } : item)))
    setEditDialogOpen(false)
    setSelectedItem(null)
    
    toast({
      variant: "success",
      title: "Menu Item Updated",
      description: `${updatedItem.name} has been updated successfully.`,
    })
  }

  const handleDeleteItem = (id: string) => {
    const item = menuItems.find(item => item.id === id)
    if (item) {
      setItemToDelete(item)
      setDeleteDialogOpen(true)
    }
  }

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      setMenuItems(menuItems.filter((item) => item.id !== itemToDelete.id))
      
      toast({
        variant: "destructive",
        title: "Menu Item Deleted",
        description: `${itemToDelete.name} has been deleted from the menu.`,
      })
      
      setItemToDelete(null)
    }
  }

  const categoryLabels = {
    signature: "Signature Coffee",
    nonCoffee: "Non Coffee",
    snacks: "Snacks",
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Content */}
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
            open={isAddDialogOpen}
            onOpenChange={handleAddDialogChange}
            onAddItem={handleAddItem}
          />

          <EditItemDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            item={selectedItem}
            onEditItem={handleEditItem}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            title="Delete Menu Item"
            description="Are you sure you want to delete this menu item?"
            onConfirm={confirmDeleteItem}
            itemName={itemToDelete?.name}
          />
        </div>
      </div>
    </div>
  )
}
