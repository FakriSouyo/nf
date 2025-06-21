import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Edit, Trash2, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DeleteConfirmationDialog from "@/components/ui/delete-confirmation-dialog"

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  image: string
  available: boolean
}

interface RewardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rewards: Reward[]
  onAddReward: (reward: Omit<Reward, "id">) => void
  onEditReward: (reward: Reward) => void
  onDeleteReward: (id: string) => void
}

export default function RewardDialog({
  open,
  onOpenChange,
  rewards,
  onAddReward,
  onEditReward,
  onDeleteReward,
}: RewardDialogProps) {
  const { toast } = useToast()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingReward, setEditingReward] = useState<Reward | null>(null)
  const [rewardForm, setRewardForm] = useState<Omit<Reward, "id">>({
    name: "",
    description: "",
    pointsCost: 0,
    image: "",
    available: true,
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null)

  const handleImageUpload = (file: File) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      const imageUrl = URL.createObjectURL(file)
      setRewardForm({ ...rewardForm, image: imageUrl })
      return imageUrl
    } else {
      alert("File size must be less than 10MB")
      return null
    }
  }

  const handleAddReward = () => {
    onAddReward(rewardForm)
    setShowAddDialog(false)
    resetForm()
    
    toast({
      variant: "success",
      title: "Reward Added Successfully!",
      description: `${rewardForm.name} reward has been created.`,
    })
  }

  const handleEditReward = (reward: Reward) => {
    setEditingReward(reward)
    setRewardForm({
      name: reward.name,
      description: reward.description,
      pointsCost: reward.pointsCost,
      image: reward.image,
      available: reward.available,
    })
    setShowEditDialog(true)
  }

  const handleDeleteReward = (reward: Reward) => {
    setRewardToDelete(reward)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteReward = () => {
    if (rewardToDelete) {
      onDeleteReward(rewardToDelete.id)
      
      toast({
        variant: "destructive",
        title: "Reward Deleted",
        description: `${rewardToDelete.name} reward has been deleted.`,
      })
      
      setRewardToDelete(null)
    }
  }

  const handleCancelAdd = () => {
    setShowAddDialog(false)
    resetForm()
  }

  const handleCancelEdit = () => {
    setShowEditDialog(false)
    setEditingReward(null)
    resetForm()
  }

  const resetForm = () => {
    setRewardForm({
      name: "",
      description: "",
      pointsCost: 0,
      image: "",
      available: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <Star className="w-6 h-6 inline mr-2" />
            Reward Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Available Rewards</h3>
            <Button onClick={() => setShowAddDialog(true)} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Reward
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 p-4 flex items-center justify-center">
                    <Image
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-bold text-[#2563eb] mb-2">{reward.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-[#2563eb] text-white">{reward.pointsCost} pts</Badge>
                    <Badge className={reward.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {reward.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditReward(reward)}
                      className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteReward(reward)}
                      variant="outline"
                      className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>

      {/* Add Reward Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">Add New Reward</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rewardName">Reward Name</Label>
              <Input
                id="rewardName"
                value={rewardForm.name}
                onChange={(e) => setRewardForm({ ...rewardForm, name: e.target.value })}
                placeholder="Enter reward name"
              />
            </div>

            <div>
              <Label htmlFor="rewardDescription">Description</Label>
              <Textarea
                id="rewardDescription"
                value={rewardForm.description}
                onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                placeholder="Enter reward description"
              />
            </div>

            <div>
              <Label htmlFor="rewardPoints">Required Points</Label>
              <Input
                id="rewardPoints"
                type="number"
                value={rewardForm.pointsCost}
                onChange={(e) => setRewardForm({ ...rewardForm, pointsCost: Number.parseInt(e.target.value) })}
                placeholder="Enter required points"
              />
            </div>

            <div>
              <Label htmlFor="rewardImageFile">Upload Image (Max 10MB)</Label>
              <Input
                id="rewardImageFile"
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
              <Label htmlFor="rewardImage">Or Image URL</Label>
              <Input
                id="rewardImage"
                value={rewardForm.image}
                onChange={(e) => setRewardForm({ ...rewardForm, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {rewardForm.image && (
              <div className="text-center">
                <Image
                  src={rewardForm.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rewardAvailable"
                checked={rewardForm.available}
                onChange={(e) => setRewardForm({ ...rewardForm, available: e.target.checked })}
              />
              <Label htmlFor="rewardAvailable">Available for redemption</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleCancelAdd}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddReward}
                disabled={!rewardForm.name || !rewardForm.pointsCost}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Add Reward
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Reward Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">Edit Reward</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="editRewardName">Reward Name</Label>
              <Input
                id="editRewardName"
                value={rewardForm.name}
                onChange={(e) => setRewardForm({ ...rewardForm, name: e.target.value })}
                placeholder="Enter reward name"
              />
            </div>

            <div>
              <Label htmlFor="editRewardDescription">Description</Label>
              <Textarea
                id="editRewardDescription"
                value={rewardForm.description}
                onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                placeholder="Enter reward description"
              />
            </div>

            <div>
              <Label htmlFor="editRewardPoints">Required Points</Label>
              <Input
                id="editRewardPoints"
                type="number"
                value={rewardForm.pointsCost}
                onChange={(e) => setRewardForm({ ...rewardForm, pointsCost: Number.parseInt(e.target.value) })}
                placeholder="Enter required points"
              />
            </div>

            <div>
              <Label htmlFor="editRewardImageFile">Upload New Image (Max 10MB)</Label>
              <Input
                id="editRewardImageFile"
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
              <Label htmlFor="editRewardImage">Or Image URL</Label>
              <Input
                id="editRewardImage"
                value={rewardForm.image}
                onChange={(e) => setRewardForm({ ...rewardForm, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            {rewardForm.image && (
              <div className="text-center">
                <Image
                  src={rewardForm.image || "/placeholder.svg"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editRewardAvailable"
                checked={rewardForm.available}
                onChange={(e) => setRewardForm({ ...rewardForm, available: e.target.checked })}
              />
              <Label htmlFor="editRewardAvailable">Available for redemption</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (editingReward) {
                    onEditReward({ ...editingReward, ...rewardForm })
                    setShowEditDialog(false)
                    setEditingReward(null)
                    resetForm()
                    
                    toast({
                      variant: "success",
                      title: "Reward Updated Successfully!",
                      description: `${rewardForm.name} reward has been updated.`,
                    })
                  }
                }}
                disabled={!rewardForm.name || !rewardForm.pointsCost}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Reward"
        description="Are you sure you want to delete this reward?"
        onConfirm={confirmDeleteReward}
        itemName={rewardToDelete?.name}
      />
    </Dialog>
  )
} 