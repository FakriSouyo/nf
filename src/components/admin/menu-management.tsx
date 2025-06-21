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
import { Plus, Edit, Trash2, Eye, EyeOff, FileText } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: "coffee" | "nonCoffee" | "snacks"
  status: "published" | "draft" | "hidden"
  popular: boolean
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Nefo Original",
    description: "Kopi original buatan nefo",
    price: 8000,
    image: "/placeholder.svg?height=200&width=200",
    category: "coffee",
    status: "published",
    popular: true,
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    description: "Sweet caramel with espresso",
    price: 12000,
    image: "/placeholder.svg?height=200&width=200",
    category: "coffee",
    status: "draft",
    popular: false,
  },
  {
    id: 3,
    name: "Velly",
    description: "Red velvet khas nefo",
    price: 15000,
    image: "/placeholder.svg?height=200&width=200",
    category: "nonCoffee",
    status: "published",
    popular: true,
  },
  {
    id: 4,
    name: "Croissant",
    description: "Buttery and flaky pastry",
    price: 8000,
    image: "/placeholder.svg?height=200&width=200",
    category: "snacks",
    status: "hidden",
    popular: false,
  },
]

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<"coffee" | "nonCoffee" | "snacks">("coffee")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "hidden">("all")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    imageFile: null as File | null,
    category: "coffee" as const,
    status: "draft" as const,
    popular: false,
  })

  const handleImageUpload = (file: File) => {
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
      price: Number(formData.price),
      image: formData.image || "/placeholder.svg?height=200&width=200",
      category: formData.category,
      status: formData.status,
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
            price: Number(formData.price),
            image: formData.image || item.image,
            category: formData.category,
            status: formData.status,
            popular: formData.popular,
          }
        : item
    )
    setMenuItems(updatedItems)
    setShowEditDialog(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id))
    }
  }

  const toggleItemStatus = (id: number, newStatus: MenuItem["status"]) => {
    setMenuItems(menuItems.map((item) => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      imageFile: null,
      category: "coffee",
      status: "draft",
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
      status: item.status,
      popular: item.popular,
    })
    setShowEditDialog(true)
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: MenuItem["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      case "hidden":
        return <Badge className="bg-gray-100 text-gray-800">Hidden</Badge>
    }
  }

  const getStatusIcon = (status: MenuItem["status"]) => {
    switch (status) {
      case "published":
        return <Eye className="w-4 h-4" />
      case "draft":
        return <FileText className="w-4 h-4" />
      case "hidden":
        return <EyeOff className="w-4 h-4" />
    }
  }

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

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("coffee")}
            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
              activeCategory === "coffee"
                ? "bg-[#2563eb] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Coffee
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

        {/* Status Filter */}
        <div className="flex space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.popular && (
                    <Badge className="bg-orange-500 text-white hover:bg-orange-500">Popular</Badge>
                  )}
                  {getStatusBadge(item.status)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#2563eb]">Rp {item.price.toLocaleString("id-ID")}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
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
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      variant={item.status === "published" ? "default" : "outline"}
                      className={item.status === "published" ? "bg-green-600 hover:bg-green-700" : ""}
                      onClick={() => toggleItemStatus(item.id, "published")}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={item.status === "draft" ? "default" : "outline"}
                      className={item.status === "draft" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                      onClick={() => toggleItemStatus(item.id, "draft")}
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={item.status === "hidden" ? "default" : "outline"}
                      className={item.status === "hidden" ? "bg-gray-600 hover:bg-gray-700" : ""}
                      onClick={() => toggleItemStatus(item.id, "hidden")}
                    >
                      <EyeOff className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Item Dialog */}
      <Dialog open={showAddDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddDialog(false)
          setShowEditDialog(false)
          setEditingItem(null)
          resetForm()
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
              {showAddDialog ? "Add New Menu Item" : "Edit Menu Item"}
            </DialogTitle>
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
                  src={formData.image}
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
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem["category"] })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="coffee">Coffee</option>
                <option value="nonCoffee">Non Coffee</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as MenuItem["status"] })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="hidden">Hidden</option>
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
                onClick={showAddDialog ? handleAddItem : handleEditItem}
                disabled={!formData.name || !formData.price}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                {showAddDialog ? "Add Item" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 