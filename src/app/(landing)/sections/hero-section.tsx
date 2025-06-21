import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col">
      <header className="p-4 md:p-8">
        <h1 className="text-[#2563eb] text-2xl md:text-3xl font-bold">Nefo coffee</h1>
      </header>

      <div className="flex-1 flex items-start justify-center px-4 pt-8 md:pt-16">
        <div className="max-w-4xl w-full text-center space-y-6">
          <div className="space-y-4">
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
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className="bg-transparent text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white px-8 py-4 text-lg font-medium rounded-none transition-all duration-300 mt-8"
          >
            [ see our menu ]
          </Button>
        </div>
      </div>
    </section>
  )
} 