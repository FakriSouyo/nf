import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Coffee } from "lucide-react"
import { User } from "./types"

interface ProfilePreferencesProps {
  user: User
}

export default function ProfilePreferences({ user }: ProfilePreferencesProps) {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coffee className="w-5 h-5 text-[#2563eb]" />
          <span>Coffee Preferences</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Favorite Order</Label>
            <p className="text-lg text-[#2563eb] font-semibold">{user.favoriteOrder}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 