import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { MenuItem } from "@/types"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddItem: (item: Omit<MenuItem, "id">) => void
}

export default function AddItemDialog({ open, onOpenChange, onAddItem }: AddItemDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    imageFile: null as File | null,
    category: "signature" as "signature" | "nonCoffee" | "snacks",
    popular: false,
    isDraft: false,
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

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      imageFile: null,
      category: "signature",
      popular: false,
      isDraft: false,
    })
  }

  const handleSubmit = () => {
    onAddItem(formData)
    resetForm()
    
    toast({
      variant: "success",
      title: "Menu Item Added Successfully!",
      description: `${formData.name} has been added to the menu.`,
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDraft"
              checked={formData.isDraft}
              onChange={(e) => setFormData({ ...formData, isDraft: e.target.checked })}
            />
            <Label htmlFor="isDraft">Save as Draft</Label>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.price}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Add Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 