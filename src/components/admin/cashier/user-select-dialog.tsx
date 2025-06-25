import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "@/types"

interface UserSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  users: User[]
  selectedUser: User
  onUserChange: (user: User) => void
}

export default function UserSelectDialog({
  open,
  onOpenChange,
  users,
  selectedUser,
  onUserChange,
}: UserSelectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Select Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className={`cursor-pointer border-2 transition-all ${
                selectedUser.id === user.id ? "border-[#2563eb] bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onUserChange(user)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Image src="/cat-thumbs-up.png" alt="User" width={20} height={20} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.vouchers && user.vouchers.length > 0 && (
                        <p className="text-xs text-green-600">{user.vouchers.length} voucher(s) available</p>
                      )}
                    </div>
                  </div>
                  {user.email !== "N/A" && <Badge className="bg-[#2563eb] text-white">{user.points} pts</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 