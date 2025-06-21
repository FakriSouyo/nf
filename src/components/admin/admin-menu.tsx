"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: "signature" | "nonCoffee" | "snacks"
  popular: boolean
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Nefo Original",
    description: "Kopi original buatan nefo",
    price: 8000,
    image: "/placeholder.svg?height=200&width=200",
    category: "signature",
    popular: true,
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    description: "Sweet caramel with espresso",
    price: 12000,
    image: "/placeholder.svg?height=200&width=200",
    category: "signature",
    popular: false,
  },
  {
    id: 4,
    name: "Velly",
    description: "Red velvet khas nefo",
    price: 15000,
    image: "/placeholder.svg?height=200&width=200",
    category: "nonCoffee",
    popular: true,
  },
  {
    id: 7,
    name: "Croissant",
    description: "Buttery and flaky pastry",
    price: 8000,
    image: "/placeholder.svg?height=200&width=200",
    category: "snacks",
    popular: false,
  },
]

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<"signature" | "nonCoffee" | "snacks">("signature")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    imageFile: null,
    category: "signature" as const,
    popular: false,
  })

  const handleImageUpload = (file) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      const imageUrl = URL.createObjectURL(file)
      setFormData({ ...formData, imageFile: file, image: imageUrl })
      return imageUrl
    } else {
      alert("File size must be less than 10MB")
      return null
    }
  }

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      price: Number.parseInt(formData.price),
      image: formData.image || "/placeholder.svg?height=200&width=200",
      category: formData.category,
      popular: formData.popular,
    }
    setMenuItems([...menuItems, newItem])
    setShowAddDialog(false)
    resetForm()
  }

  const handleEditItem = () => {
    if (!editingItem) return
    const updatedItems = menuItems.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            name: formData.name,
            description: formData.description,
            price: Number.parseInt(formData.price),
            image: formData.image || item.image,
            category: formData.category,
            popular: formData.popular,
          }
        : item,
    )
    setMenuItems(updatedItems)
    setShowEditDialog(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      imageFile: null,
      category: "signature",
      popular: false,
    })
  }

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      imageFile: null,
      category: item.category,
      popular: item.popular,
    })
    setShowEditDialog(true)
  }

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Menu Management</h1>
          <Image src="/cat-thumbs-up.png" alt="Menu Cat" width={40} height={40} className="w-10 h-10" />
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveCategory("signature")}
          className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
            activeCategory === "signature"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Signature Coffee
        </button>
        <button
          onClick={() => setActiveCategory("nonCoffee")}
          className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
            activeCategory === "nonCoffee"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Non Coffee
        </button>
        <button
          onClick={() => setActiveCategory("snacks")}
          className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
            activeCategory === "snacks"
              ? "bg-[#2563eb] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          Snacks
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg?height=150&width=150"}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {item.popular && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white hover:bg-orange-500">Popular</Badge>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#2563eb]">Rp {item.price.toLocaleString("id-ID")}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => openEditDialog(item)}
                    className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Add New Menu Item</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <Label htmlFor="price">Price (Rp)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="imageFile">Upload Image (Max 10MB)</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file)
                  }
                }}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="image">Or Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {formData.image && (
              <div className="text-center">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="signature">Signature Coffee</option>
                <option value="nonCoffee">Non Coffee</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="popular"
                checked={formData.popular}
                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              />
              <Label htmlFor="popular">Mark as Popular</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowAddDialog(false)
                  resetForm()
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddItem}
                disabled={!formData.name || !formData.price}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Edit Menu Item</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Product Name</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <Label htmlFor="editPrice">Price (Rp)</Label>
              <Input
                id="editPrice"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="editImageFile">Upload New Image (Max 10MB)</Label>
              <Input
                id="editImageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file)
                  }
                }}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="editImage">Or Image URL</Label>
              <Input
                id="editImage"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {formData.image && (
              <div className="text-center">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div>
              <Label htmlFor="editCategory">Category</Label>
              <select
                id="editCategory"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="signature">Signature Coffee</option>
                <option value="nonCoffee">Non Coffee</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editPopular"
                checked={formData.popular}
                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              />
              <Label htmlFor="editPopular">Mark as Popular</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowEditDialog(false)
                  setEditingItem(null)
                  resetForm()
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditItem}
                disabled={!formData.name || !formData.price}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
