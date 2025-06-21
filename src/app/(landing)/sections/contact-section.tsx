import Image from "next/image"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Phone, Mail } from "lucide-react"

export default function ContactSection() {
  return (
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
  )
} 