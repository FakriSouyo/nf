import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmDelete: () => void
}

export default function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirmDelete,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-red-600">Delete Account</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Image src="/cat-welcome.png" alt="Sad Cat" width={60} height={60} className="w-15 h-15 mx-auto mb-4" />
            <p className="text-gray-600">
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your
              points, vouchers, and order history.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={onConfirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Delete Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 