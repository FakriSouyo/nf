import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Link } from "lucide-react"

interface EditPhotoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImage: string
  newPhotoUrl: string
  onNewPhotoUrlChange: (url: string) => void
  onPhotoFileChange: (file: File | null) => void
  onSave: () => void
}

export default function EditPhotoDialog({
  open,
  onOpenChange,
  currentImage,
  newPhotoUrl,
  onNewPhotoUrlChange,
  onPhotoFileChange,
  onSave,
}: EditPhotoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#2563eb]">
            <Camera className="w-5 h-5 inline mr-2" />
            Edit Profile Photo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-4">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt="Current Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="photoFile" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Upload from device</span>
              </Label>
              <Input
                id="photoFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    onPhotoFileChange(file)
                    onNewPhotoUrlChange("")
                  }
                }}
                className="mt-1"
              />
            </div>

            <div className="text-center text-sm text-gray-500">or</div>

            <div>
              <Label htmlFor="photoUrl" className="flex items-center space-x-2">
                <Link className="w-4 h-4" />
                <span>Enter image URL</span>
              </Label>
              <Input
                id="photoUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newPhotoUrl}
                onChange={(e) => {
                  onNewPhotoUrlChange(e.target.value)
                  onPhotoFileChange(null)
                }}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => {
                onOpenChange(false)
                onNewPhotoUrlChange("")
                onPhotoFileChange(null)
              }}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={!newPhotoUrl}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 