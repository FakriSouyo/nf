import Image from "next/image"

export default function HistoryHeader() {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#2563eb]">Order History</h1>
      <Image src="/cat-welcome.png" alt="Cat Welcome" width={40} height={40} className="w-10 h-10" />
    </div>
  )
} 