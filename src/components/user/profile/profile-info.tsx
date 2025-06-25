import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Edit2, Camera, User as UserIcon } from "lucide-react"
import { User } from "@/types"

interface ProfileInfoProps {
  user: User
  isEditingName: boolean
  newName: string
  onEditName: () => void
  onSaveName: () => void
  onCancelEdit: () => void
  onNewNameChange: (value: string) => void
  onEditPhoto: () => void
}

export default function ProfileInfo({
  user,
  isEditingName,
  newName,
  onEditName,
  onSaveName,
  onCancelEdit,
  onNewNameChange,
  onEditPhoto,
}: ProfileInfoProps) {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserIcon className="w-5 h-5 text-[#2563eb]" />
          <span>Personal Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={user.profileImage || "/placeholder.svg"}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onEditPhoto}
              className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-white border-2 border-[#2563eb]"
            >
              <Camera className="w-4 h-4 text-[#2563eb]" />
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={newName}
                    onChange={(e) => onNewNameChange(e.target.value)}
                    className="max-w-xs"
                    autoFocus
                  />
                  <Button size="sm" onClick={onSaveName} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <Button size="sm" variant="outline" onClick={onEditName} className="p-2">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-gray-600 mb-1">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <span className="w-4 h-4 text-center">📱</span>
                <span>{user.phone}</span>
              </div>
            )}
            {user.joinDate && (
              <p className="text-sm text-gray-500 mt-1">Member since {user.joinDate}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 