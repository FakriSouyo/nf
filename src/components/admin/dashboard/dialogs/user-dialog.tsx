import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Users } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  totalCups: number
  points: number
  locked: boolean
}

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  users: User[]
  onUpdatePoints: (userId: number, points: number) => void
  onToggleLock: (userId: number) => void
}

export default function UserDialog({ open, onOpenChange, users, onUpdatePoints, onToggleLock }: UserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            <Users className="w-6 h-6 inline mr-2" />
            User Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Image src="/cat-thumbs-up.png" alt="User" width={24} height={24} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#2563eb]">{user.totalCups} cups</div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={user.points}
                          onChange={(e) => onUpdatePoints(user.id, Number.parseInt(e.target.value) || 0)}
                          disabled={user.locked}
                          className={`w-20 h-8 text-sm text-center ${user.locked ? "bg-gray-100" : ""}`}
                        />
                        <span className="text-sm text-gray-600">points</span>
                        <Button size="sm" variant="outline" onClick={() => onToggleLock(user.id)} className="p-2">
                          {user.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 