import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const { toast } = useToast()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email === "admin@nefocoffee.com" && loginForm.password === "admin123") {
      onLoginSuccess()
      toast({
        variant: "success",
        title: "Login Successful!",
        description: "Welcome to Nefo Coffee Admin Panel",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      })
    }
  }

  const isFormValid = loginForm.email.trim() !== "" && loginForm.password.trim() !== ""

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Image src="/cat-mascot.png" alt="Admin Cat" width={80} height={80} className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#2563eb] mb-2">Admin Login</h1>
            <p className="text-gray-600">Welcome to Nefo Coffee Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="admin@nefocoffee.com"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login to Admin Panel
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-gray-600">Email: admin@nefocoffee.com</p>
            <p className="text-sm text-gray-600">Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 