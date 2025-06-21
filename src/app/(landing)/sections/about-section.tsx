import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Star, Clock } from "lucide-react"

export default function AboutSection() {
  return (
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
  )
} 