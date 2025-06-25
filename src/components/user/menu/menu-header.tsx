import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface MenuHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: "signature" | "nonCoffee" | "snacks"
  setActiveCategory: (category: "signature" | "nonCoffee" | "snacks") => void
}

export default function MenuHeader({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: MenuHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-[#f5f5f0]/70 backdrop-blur-md border-b border-gray-200">
      <div className="p-4 md:p-8 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb] mb-2">Menu</h1>
            <p className="text-gray-600">Choose your perfect coffee experience</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/cat-thumbs-up.png" alt="Cat Thumbs Up" width={40} height={40} className="w-10 h-10" />
          </div>
        </div>

        {/* Search and Category Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-[#2563eb]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("signature")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "signature"
                  ? "bg-[#2563eb] text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Signature Coffee
            </button>
            <button
              onClick={() => setActiveCategory("nonCoffee")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "nonCoffee"
                  ? "bg-[#2563eb] text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Non Coffee
            </button>
            <button
              onClick={() => setActiveCategory("snacks")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === "snacks"
                  ? "bg-[#2563eb] text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Snacks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 