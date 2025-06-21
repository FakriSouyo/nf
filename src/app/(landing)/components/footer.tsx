export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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
  )
} 