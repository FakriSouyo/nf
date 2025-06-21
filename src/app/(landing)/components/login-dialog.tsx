import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess: () => void
}

export default function LoginDialog({ open, onOpenChange, onLoginSuccess }: LoginDialogProps) {
  const { toast } = useToast()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [recaptchaChecked, setRecaptchaChecked] = useState(false)
  const [showRecaptchaJoke, setShowRecaptchaJoke] = useState(false)

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    return phoneRegex.test(phone)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(loginForm.email)) {
      toast({
        variant: "error",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return
    }

    if (loginForm.email === "demo@nefocoffee.com" && loginForm.password === "demo123") {
      onLoginSuccess()
      onOpenChange(false)
      toast({
        variant: "success",
        title: "Login Successful!",
        description: "Welcome back to Nefo Coffee!",
      })
    } else {
      toast({
        variant: "error",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      })
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(signupForm.email)) {
      toast({
        variant: "error",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return
    }

    if (!validatePhone(signupForm.phone)) {
      toast({
        variant: "error",
        title: "Invalid Phone Number",
        description: "Please enter a valid Indonesian phone number.",
      })
      return
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        variant: "error",
        title: "Password Mismatch",
        description: "Password and confirm password do not match.",
      })
      return
    }

    if (signupForm.password.length < 6) {
      toast({
        variant: "error",
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
      })
      return
    }

    // Simulate successful signup
    onLoginSuccess()
    onOpenChange(false)
    toast({
      variant: "success",
      title: "Account Created!",
      description: "Welcome to Nefo Coffee! Your account has been created successfully.",
    })
  }

  const handleRecaptchaChange = (checked: boolean) => {
    setRecaptchaChecked(checked)
    if (checked) {
      setShowRecaptchaJoke(true)
      setTimeout(() => setShowRecaptchaJoke(false), 3000)
    }
  }

  const isLoginFormValid = loginForm.email && loginForm.password
  const isSignupFormValid =
    signupForm.name &&
    signupForm.email &&
    signupForm.phone &&
    signupForm.password &&
    signupForm.confirmPassword &&
    recaptchaChecked

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">
            {isSignUp ? "Sign Up" : "Login"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center">
            <Image src="/cat-thumbs-up.png" alt="Cat Thumbs Up" width={60} height={60} className="w-12 h-12" />
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={isSignUp ? signupForm.email : loginForm.email}
                onChange={(e) =>
                  isSignUp
                    ? setSignupForm({ ...signupForm, email: e.target.value })
                    : setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62 123 456 7890"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={isSignUp ? signupForm.password : loginForm.password}
                  onChange={(e) =>
                    isSignUp
                      ? setSignupForm({ ...signupForm, password: e.target.value })
                      : setLoginForm({ ...loginForm, password: e.target.value })
                  }
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
            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="recaptcha" checked={recaptchaChecked} onCheckedChange={handleRecaptchaChange} />
                  <Label htmlFor="recaptcha" className="text-sm">
                    I'm not a robot (reCAPTCHA)
                  </Label>
                </div>
                {showRecaptchaJoke && (
                  <p className="text-xs text-green-600 italic">Joking! There is no reCAPTCHA 😄</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSignUp ? !isSignupFormValid : !isLoginFormValid}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            onClick={() => {
              setLoginForm({ email: "demo@nefocoffee.com", password: "demo123" })
              handleLogin({ preventDefault: () => {} } as React.FormEvent)
            }}
            variant="outline"
            className="w-full border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
          >
            <Image src="/cat-mascot.png" alt="Demo" width={16} height={16} className="mr-2 h-4 w-4" />
            Try Demo Account
          </Button>

          <div className="text-center">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-[#2563eb] hover:underline">
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 