import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Trash2 } from "lucide-react"

interface AccountActionsProps {
  onLogout: () => void
  onDeleteAccount: () => void
}

export default function AccountActions({ onLogout, onDeleteAccount }: AccountActionsProps) {
  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-red-600">Account Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
        <Button
          onClick={onDeleteAccount}
          variant="outline"
          className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-3" />
          Delete Account
        </Button>
      </CardContent>
    </Card>
  )
} 