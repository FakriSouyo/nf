"use client"

import { useState, useEffect } from "react"
import DashboardPage from "@/components/dashboard-page"
import MenuPage from "@/components/menu-page"
import ProfilePage from "@/components/profile-page"
import HistoryPage from "@/components/history-page"
import NotificationDropdown from "@/components/notification-dropdown"
import { Bell } from "lucide-react"

import HeroSection from "./(landing)/sections/hero-section"
import MenuSection from "./(landing)/sections/menu-section"
import AboutSection from "./(landing)/sections/about-section"
import ContactSection from "./(landing)/sections/contact-section"
import Navigation from "./(landing)/components/navigation"
import LoginDialog from "./(landing)/components/login-dialog"
import Footer from "./(landing)/components/footer"

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<"dashboard" | "menu" | "profile" | "history">("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)

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

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    if (hasUnreadNotifications) {
      setHasUnreadNotifications(false)
    }
  }

  // If logged in, show the dashboard app
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f5f5f0]">
        {/* Main Content */}
        <div className="pb-20">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "menu" && <MenuPage />}
          {currentPage === "profile" && <ProfilePage onLogout={() => setIsLoggedIn(false)} />}
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
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Navigation showNavbar={showNavbar} onLoginClick={() => setShowLoginDialog(true)} />
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
      <Footer />
    </div>
  )
}
