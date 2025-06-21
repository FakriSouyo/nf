import Image from "next/image"
import { LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  handleLogout: () => void
  menuItems: Array<{
    title: string
    icon: any
    id: string
  }>
}

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout, menuItems }: AdminSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Image src="/cat-mascot.png" alt="Admin Cat" width={40} height={40} className="w-10 h-10" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-[#2563eb]">Nefo Admin</h2>
            <p className="text-sm text-gray-600">Management Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveTab(item.id)}
                isActive={activeTab === item.id}
                className="w-full justify-start"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="w-full justify-start text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
} 