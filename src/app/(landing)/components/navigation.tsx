import { Button } from "@/components/ui/button"

interface NavigationProps {
  showNavbar: boolean
  onLoginClick: () => void
}

export default function Navigation({ showNavbar, onLoginClick }: NavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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
            onClick={onLoginClick}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2 rounded-full font-medium text-sm font-jetbrains"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  )
} 