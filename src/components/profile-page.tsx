"use client"

import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { User, Redemption } from "@/types"
import { demoUser, demoRedemptions } from "@/data/user"

// Import separated components
import ProfileInfo from "./user/profile/profile-info"
import ProfileStats from "./user/profile/profile-stats"
import ProfilePreferences from "./user/profile/profile-preferences"
import RedemptionHistory from "./user/profile/redemption-history"
import ProfileSettings from "./user/profile/profile-settings"
import AccountActions from "./user/profile/account-actions"
import PointsInfoDialog from "./user/profile/dialogs/points-info-dialog"
import RedemptionHistoryDialog from "./user/profile/dialogs/redemption-history-dialog"
import EditPhotoDialog from "./user/profile/dialogs/edit-photo-dialog"
import DeleteAccountDialog from "./user/profile/dialogs/delete-account-dialog"

interface ProfilePageProps {
  onLogout: () => void
}

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const { toast } = useToast()
  const [user, setUser] = useState<User>(demoUser)
  const [redemptions] = useState<Redemption[]>(demoRedemptions)

  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState(user.name)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditPhotoDialog, setShowEditPhotoDialog] = useState(false)
  const [showRedemptionHistory, setShowRedemptionHistory] = useState(false)
  const [showPointsInfo, setShowPointsInfo] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const handleSaveName = () => {
    setUser((prev) => ({ ...prev, name: newName }))
    setIsEditingName(false)
    toast({
      variant: "success",
      title: "Profile Updated",
      description: "Your name has been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false)
    toast({
      variant: "success",
      title: "Account Deleted",
      description: "Your account has been deleted successfully.",
    })
    onLogout()
  }

  const handleLogout = () => {
    toast({
      variant: "success",
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
    onLogout()
  }

  const handleSavePhoto = () => {
    if (newPhotoUrl) {
      setUser((prev) => ({ ...prev, profileImage: newPhotoUrl }))
    } else if (photoFile) {
      const fileUrl = URL.createObjectURL(photoFile)
      setUser((prev) => ({ ...prev, profileImage: fileUrl }))
    }
    setShowEditPhotoDialog(false)
    setNewPhotoUrl("")
    setPhotoFile(null)
    toast({
      variant: "success",
      title: "Photo Updated",
      description: "Your profile photo has been updated successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-4 md:p-8">
      {/* Header - Desktop only */}
      <div className="hidden md:block mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Profile</h1>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center space-x-3 mb-8">
        <h1 className="text-3xl font-bold text-[#2563eb]">Profile</h1>
        <Image src="/cat-welcome.png" alt="Cat Welcome" width={40} height={40} className="w-10 h-10" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileInfo
          user={user}
          isEditingName={isEditingName}
          newName={newName}
          onEditName={() => setIsEditingName(true)}
          onSaveName={handleSaveName}
          onCancelEdit={() => setIsEditingName(false)}
          onNewNameChange={(value) => setNewName(value)}
          onEditPhoto={() => setShowEditPhotoDialog(true)}
        />

        <ProfileStats user={user} onShowPointsInfo={() => setShowPointsInfo(true)} />

        <ProfilePreferences user={user} />

        <RedemptionHistory onViewHistory={() => setShowRedemptionHistory(true)} />

        <ProfileSettings />

        <AccountActions onLogout={handleLogout} onDeleteAccount={() => setShowDeleteDialog(true)} />
      </div>

      <PointsInfoDialog open={showPointsInfo} onOpenChange={setShowPointsInfo} />

      <RedemptionHistoryDialog
        open={showRedemptionHistory}
        onOpenChange={setShowRedemptionHistory}
        redemptions={redemptions}
      />

      <EditPhotoDialog
        open={showEditPhotoDialog}
        onOpenChange={setShowEditPhotoDialog}
        currentImage={user.profileImage || ""}
        newPhotoUrl={newPhotoUrl}
        onNewPhotoUrlChange={setNewPhotoUrl}
        onPhotoFileChange={setPhotoFile}
        onSave={handleSavePhoto}
      />

      <DeleteAccountDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={handleDeleteAccount}
      />
    </div>
  )
}
