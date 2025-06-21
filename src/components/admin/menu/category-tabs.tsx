interface CategoryTabsProps {
  activeCategory: "signature" | "nonCoffee" | "snacks"
  onCategoryChange: (category: "signature" | "nonCoffee" | "snacks") => void
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto">
      <button
        onClick={() => onCategoryChange("signature")}
        className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
          activeCategory === "signature"
            ? "bg-[#2563eb] text-white"
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        Signature Coffee
      </button>
      <button
        onClick={() => onCategoryChange("nonCoffee")}
        className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
          activeCategory === "nonCoffee"
            ? "bg-[#2563eb] text-white"
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        Non Coffee
      </button>
      <button
        onClick={() => onCategoryChange("snacks")}
        className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
          activeCategory === "snacks"
            ? "bg-[#2563eb] text-white"
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        Snacks
      </button>
    </div>
  )
} 