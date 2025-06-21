import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"

interface Voucher {
  id: number
  title: string
  discount: string
  active: boolean
}

interface VoucherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vouchers: Voucher[]
  onAddVoucher: (voucher: Omit<Voucher, "id">) => void
  onEditVoucher: (voucher: Voucher) => void
  onDeleteVoucher: (id: number) => void
  onToggleStatus: (id: number) => void
}

export default function VoucherDialog({
  open,
  onOpenChange,
  vouchers,
  onAddVoucher,
  onEditVoucher,
  onDeleteVoucher,
  onToggleStatus,
}: VoucherDialogProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null)
  const [formVoucher, setFormVoucher] = useState({
    title: "",
    discount: "",
    active: true,
  })

  const handleAddVoucher = () => {
    onAddVoucher(formVoucher)
    setShowAddDialog(false)
    resetForm()
  }

  const handleEditVoucher = () => {
    if (editingVoucher) {
      onEditVoucher({ ...editingVoucher, ...formVoucher })
      setShowEditDialog(false)
      setEditingVoucher(null)
      resetForm()
    }
  }

  const openEditDialog = (voucher: Voucher) => {
    setEditingVoucher(voucher)
    setFormVoucher({
      title: voucher.title,
      discount: voucher.discount,
      active: voucher.active,
    })
    setShowEditDialog(true)
  }

  const resetForm = () => {
    setFormVoucher({
      title: "",
      discount: "",
      active: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <Gift className="w-6 h-6 inline mr-2" />
            Weekly Voucher Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">This Week's Vouchers</h3>
            <Button
              size="sm"
              onClick={() => setShowAddDialog(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Voucher
            </Button>
          </div>

          {vouchers.map((voucher) => (
            <Card key={voucher.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{voucher.title}</h4>
                    <p className="text-sm text-gray-600">Discount: {voucher.discount}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => onToggleStatus(voucher.id)} className="flex items-center space-x-2">
                      {voucher.active ? (
                        <ToggleRight className="w-8 h-8 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                      <span className={`text-sm font-medium ${voucher.active ? "text-green-600" : "text-gray-500"}`}>
                        {voucher.active ? "Active" : "Inactive"}
                      </span>
                    </button>
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(voucher)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-300"
                      onClick={() => onDeleteVoucher(voucher.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>

      {/* Add Voucher Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Add New Voucher</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="voucherTitle">Voucher Title</Label>
              <Input
                id="voucherTitle"
                value={formVoucher.title}
                onChange={(e) => setFormVoucher({ ...formVoucher, title: e.target.value })}
                placeholder="Enter voucher title"
              />
            </div>

            <div>
              <Label htmlFor="voucherDiscount">Discount</Label>
              <Input
                id="voucherDiscount"
                value={formVoucher.discount}
                onChange={(e) => setFormVoucher({ ...formVoucher, discount: e.target.value })}
                placeholder="e.g. 20% or FREE"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="voucherActive"
                checked={formVoucher.active}
                onChange={(e) => setFormVoucher({ ...formVoucher, active: e.target.checked })}
              />
              <Label htmlFor="voucherActive">Active</Label>
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
                onClick={handleAddVoucher}
                disabled={!formVoucher.title || !formVoucher.discount}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Add Voucher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Voucher Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Edit Voucher</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="editVoucherTitle">Voucher Title</Label>
              <Input
                id="editVoucherTitle"
                value={formVoucher.title}
                onChange={(e) => setFormVoucher({ ...formVoucher, title: e.target.value })}
                placeholder="Enter voucher title"
              />
            </div>

            <div>
              <Label htmlFor="editVoucherDiscount">Discount</Label>
              <Input
                id="editVoucherDiscount"
                value={formVoucher.discount}
                onChange={(e) => setFormVoucher({ ...formVoucher, discount: e.target.value })}
                placeholder="e.g. 20% or FREE"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editVoucherActive"
                checked={formVoucher.active}
                onChange={(e) => setFormVoucher({ ...formVoucher, active: e.target.checked })}
              />
              <Label htmlFor="editVoucherActive">Active</Label>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setShowEditDialog(false)
                  setEditingVoucher(null)
                  resetForm()
                }}
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditVoucher}
                disabled={!formVoucher.title || !formVoucher.discount}
                className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  )
} 