import Image from "next/image"

interface DashboardHeaderProps {
  userName: string
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="md:col-span-4 lg:col-span-6 mb-4 md:mb-0">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Hello, {userName}</h1>
        <Image src="/cat-mascot.png" alt="Cat Mascot" width={40} height={40} className="w-10 h-10" />
      </div>
    </div>
  )
} 