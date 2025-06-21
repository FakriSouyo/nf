"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Clock, Phone, Mail, Star, Bell, Eye, EyeOff } from "lucide-react"
import DashboardPage from "@/components/dashboard-page"
import MenuPage from "@/components/menu-page"
import ProfilePage from "@/components/profile-page"
import HistoryPage from "@/components/history-page"
import NotificationDropdown from "@/components/notification-dropdown"
import { useToast } from "@/hooks/use-toast"

const menuItems = {
  signature: [
    {
      id: 1,
      name: "Nefo Original",
      description: "Kopi original buatan nefo",
      price: "8k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-amber-200 to-orange-200",
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      description: "Sweet caramel with espresso",
      price: "12k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-amber-300 to-yellow-200",
    },
    {
      id: 3,
      name: "Nefo Special",
      description: "Our signature blend",
      price: "15k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-brown-200 to-amber-200",
    },
  ],
  nonCoffee: [
    {
      id: 4,
      name: "Velly",
      description: "Red velvet khas nefo",
      price: "15k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-red-200 to-pink-200",
    },
    {
      id: 5,
      name: "Matcha Latte",
      description: "Premium matcha blend",
      price: "18k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-green-200 to-emerald-200",
    },
    {
      id: 6,
      name: "Chocolate Frappe",
      description: "Rich chocolate delight",
      price: "20k",
      image: "/placeholder.svg?height=300&width=200",
      color: "from-purple-200 to-pink-200",
    },
  ],
}

export default function Home() {
  const { toast } = useToast()
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<"dashboard" | "menu" | "profile" | "history">("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
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

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNavbar(false)
        } else {
          setShowNavbar(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
      setIsLoggedIn(true)
      setShowLoginDialog(false)
      setCurrentPage("dashboard")
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
    setIsLoggedIn(true)
    setShowLoginDialog(false)
    setCurrentPage("dashboard")
    toast({
      variant: "success",
      title: "Account Created!",
      description: "Welcome to Nefo Coffee! Your account has been created successfully.",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard")
    toast({
      variant: "success",
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    if (hasUnreadNotifications) {
      setHasUnreadNotifications(false)
    }
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

  // If logged in, show the dashboard app
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f5f5f0]">
        {/* Main Content */}
        <div className="pb-20">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "menu" && <MenuPage />}
          {currentPage === "profile" && <ProfilePage onLogout={handleLogout} />}
          {currentPage === "history" && <HistoryPage />}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 shadow-2xl">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`font-medium text-sm transition-colors font-jetbrains ${
                  currentPage === "dashboard" ? "text-[#2563eb]" : "text-gray-600 hover:text-[#2563eb]"
                }`}
              >
                DASHBOARD
              </button>
              <button
                onClick={() => setCurrentPage("menu")}
                className={`font-medium text-sm transition-colors font-jetbrains ${
                  currentPage === "menu" ? "text-[#2563eb]" : "text-gray-600 hover:text-[#2563eb]"
                }`}
              >
                MENU
              </button>
              <button
                onClick={() => setCurrentPage("history")}
                className={`font-medium text-sm transition-colors font-jetbrains ${
                  currentPage === "history" ? "text-[#2563eb]" : "text-gray-600 hover:text-[#2563eb]"
                }`}
              >
                HISTORY
              </button>
              <button
                onClick={() => setCurrentPage("profile")}
                className={`font-medium text-sm transition-colors font-jetbrains ${
                  currentPage === "profile" ? "text-[#2563eb]" : "text-gray-600 hover:text-[#2563eb]"
                }`}
              >
                PROFILE
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="p-2 text-gray-600 hover:text-[#2563eb] transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {hasUnreadNotifications && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  )}
                </button>

                {showNotifications && (
                  <NotificationDropdown
                    onClose={() => setShowNotifications(false)}
                    onNotificationRead={() => setHasUnreadNotifications(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }

  // Pre-login landing page
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col">
        <header className="p-4 md:p-8">
          <h1 className="text-[#2563eb] text-2xl md:text-3xl font-bold">Nefo coffee</h1>
        </header>

        <div className="flex-1 flex items-start justify-center px-4 pt-8 md:pt-16">
          <div className="max-w-4xl w-full text-center space-y-6">
            <div className="space-y-4">
              {/* Cat mascot positioned above and overlapping the headline */}
              <div className="flex justify-center relative z-10 mb-4">
                <Image
                  src="/cat-mascot.png"
                  alt="Nefo Coffee Cat Mascot"
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48 sticker-shadow"
                />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-[#2563eb] leading-tight text-shadow-white border-shadow relative -mt-8">
                No Stress. Just Sips.
                <br />
                Chill vibes, good coffee—only at Nefo.
              </h2>

              <div className="space-y-3 text-[#6b7280] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                <p>Crafted with care, Nefo Coffee invites you to slow down and savor the moment.</p>
                <p>
                  From our thoughtfully brewed selections to our warm, inviting space — we're here to make your day just
                  a little more peaceful, one cup at a time.
                </p>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection("menu")}
              variant="outline"
              className="bg-transparent text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white px-8 py-4 text-lg font-medium rounded-none transition-all duration-300 mt-8"
            >
              [ see our menu ]
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="min-h-screen py-20 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern animate-grid-move"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-4">Menu</h2>
            <div className="flex justify-center">
              <Image
                src="/cat-thumbs-up.png"
                alt="Cat Thumbs Up"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2563eb] bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
                Signature
              </h3>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 pb-4">
                {menuItems.signature.map((item, index) => (
                  <div key={item.id} className="flex-shrink-0 w-80">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.svg?height=200&width=200"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="text-2xl font-bold text-gray-900">{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Non Coffee Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2563eb] bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
                Non Coffee
              </h3>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 pb-4">
                {menuItems.nonCoffee.map((item, index) => (
                  <div key={item.id} className="flex-shrink-0 w-80">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.svg?height=200&width=200"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="text-2xl font-bold text-gray-900">{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-8">About</h2>
            <div className="flex justify-center mb-8">
              <Image
                src="/cat-welcome.png"
                alt="Cat Welcome"
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#2563eb]">Our Story</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nefo Coffee was born from a simple belief: great coffee should bring people together in a space that
                feels like home. Our journey began with a passion for crafting the perfect cup and creating moments of
                peace in our busy world.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every bean is carefully selected, every brew is thoughtfully prepared, and every customer is welcomed
                with the warmth that makes Nefo Coffee more than just a coffee shop—it's a community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                <Star className="w-8 h-8 text-[#2563eb] mx-auto mb-4" />
                <h4 className="font-bold text-[#2563eb] mb-2">Premium Quality</h4>
                <p className="text-sm text-gray-600">Carefully sourced beans</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-0">
                <Clock className="w-8 h-8 text-[#2563eb] mx-auto mb-4" />
                <h4 className="font-bold text-[#2563eb] mb-2">Fresh Daily</h4>
                <p className="text-sm text-gray-600">Roasted every morning</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-4">Contact</h2>
            <p className="text-xl text-gray-600">Visit us or get in touch</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-8 h-8 text-[#2563eb]" />
                  <div>
                    <h4 className="font-bold text-[#2563eb] mb-1">Location</h4>
                    <p className="text-gray-600">Jl. Coffee Street No. 123, Jakarta</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-[#2563eb]" />
                  <div>
                    <h4 className="font-bold text-[#2563eb] mb-1">Hours</h4>
                    <p className="text-gray-600">Mon-Sun: 7:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-[#2563eb]" />
                  <div>
                    <h4 className="font-bold text-[#2563eb] mb-1">Phone</h4>
                    <p className="text-gray-600">+62 123 456 7890</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Mail className="w-8 h-8 text-[#2563eb]" />
                  <div>
                    <h4 className="font-bold text-[#2563eb] mb-1">Email</h4>
                    <p className="text-gray-600">hello@nefocoffee.com</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/cat-mascot.png"
                  alt="Nefo Coffee Cat"
                  width={200}
                  height={200}
                  className="w-40 h-40 mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-[#2563eb] mb-4">We'd love to see you!</h3>
                <p className="text-gray-600">Come visit us for the perfect coffee experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-50 ${
          showNavbar ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-[#2563eb] font-medium text-sm hover:text-[#1d4ed8] transition-colors font-jetbrains"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-[#2563eb] font-medium text-sm hover:text-[#1d4ed8] transition-colors font-jetbrains"
              >
                MENU
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-[#2563eb] font-medium text-sm hover:text-[#1d4ed8] transition-colors font-jetbrains"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#2563eb] font-medium text-sm hover:text-[#1d4ed8] transition-colors font-jetbrains"
              >
                CONTACT
              </button>
            </div>
            <Button
              onClick={() => setShowLoginDialog(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2 rounded-full font-medium text-sm font-jetbrains"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Login/Signup Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
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

      {/* Footer */}
      <footer className="bg-[#2563eb] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4">Nefo Coffee</h3>
              <p className="text-blue-100">No Stress. Just Sips. Creating moments of peace, one cup at a time.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block text-blue-100 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="block text-blue-100 hover:text-white transition-colors"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-blue-100 hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-blue-100 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">IG</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">FB</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">TW</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 Nefo Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
