"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Eye, EyeOff, Pencil, Trash2, Star } from "lucide-react"
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog"
import { MenuItem, AdminMenuProps } from "@/types"
import { demoMenuItems } from "@/data/admin"

export default function AdminMenu({
  searchTerm = "",
  menuFilter = "all",
  menuCategory = "signature",
}: AdminMenuProps) {
  const { toast } = useToast()
  const [menuItems, setMenuItems] = useState<MenuItem[]>(demoMenuItems)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)

  // Filter menu items based on search term, filter, and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = menuFilter === "all" ||
      (menuFilter === "published" && !item.isDraft) ||
      (menuFilter === "draft" && item.isDraft)
    const matchesCategory = item.category === menuCategory

    return matchesSearch && matchesFilter && matchesCategory
  })

  const handleToggleStatus = (itemId: string | number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isDraft: !item.isDraft } : item
      )
    )

    const item = menuItems.find((i) => i.id === itemId)
    if (item) {
      toast({
        variant: "success",
        title: item.isDraft ? "Item Published" : "Item Moved to Draft",
        description: `${item.name} has been ${item.isDraft ? "published" : "moved to draft"}.`,
      })
    }
  }

  const handleTogglePopular = (itemId: string | number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, popular: !item.popular } : item
      )
    )

    const item = menuItems.find((i) => i.id === itemId)
    if (item) {
      toast({
        variant: "success",
        title: item.popular ? "Removed from Popular" : "Added to Popular",
        description: `${item.name} has been ${item.popular ? "removed from" : "added to"} popular items.`,
      })
    }
  }

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (item: MenuItem) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setMenuItems((prev) => prev.filter((item) => item.id !== itemToDelete.id))
      toast({
        variant: "success",
        title: "Item Deleted",
        description: `${itemToDelete.name} has been deleted successfully.`,
      })
      setItemToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleSaveEdit = (editedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === editedItem.id ? editedItem : item))
    )
    toast({
      variant: "success",
      title: "Item Updated",
      description: `${editedItem.name} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        {item.popular && (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTogglePopular(item.id)}
                          className={item.popular ? "text-yellow-500" : "text-gray-500"}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(item.id)}
                        >
                          {item.isDraft ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm text-gray-500">
                        Category: <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-lg font-bold text-[#2563eb]">
                        Rp {Number(item.price).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedItem.description}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={selectedItem.price}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, price: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={selectedItem.category}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      category: e.target.value as "signature" | "nonCoffee" | "snacks",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="signature">Signature</option>
                  <option value="nonCoffee">Non-Coffee</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="popular">Popular Item</Label>
                <Switch
                  id="popular"
                  checked={selectedItem.popular}
                  onCheckedChange={(checked) =>
                    setSelectedItem({ ...selectedItem, popular: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="draft">Draft</Label>
                <Switch
                  id="draft"
                  checked={selectedItem.isDraft}
                  onCheckedChange={(checked) =>
                    setSelectedItem({ ...selectedItem, isDraft: checked })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSaveEdit(selectedItem)}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Menu Item"
        description="Are you sure you want to delete this menu item? This action cannot be undone."
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name}
      />
    </div>
  )
}
