import Image from "next/image"
import { Card } from "@/components/ui/card"

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

export default function MenuSection() {
  return (
    <section id="menu" className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern animate-grid-move"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-4">Menu</h2>
          <div className="flex justify-center">
            <Image src="/cat-thumbs-up.png" alt="Cat Thumbs Up" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20" />
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
              {menuItems.signature.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                      <Image
                        src={item.image}
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
              {menuItems.nonCoffee.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                      <Image
                        src={item.image}
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
  )
} 