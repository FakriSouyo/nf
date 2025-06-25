"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import RedemptionCard from "./redemptions/redemption-card"
import RedemptionDetailsDialog from "./redemptions/redemption-details-dialog"
import RedemptionPagination from "./redemptions/redemption-pagination"
import { Redemption, AdminRedemptionsProps, statusLabels } from "./redemptions/types"

// Dummy redemption data
const dummyRedemptions: Redemption[] = [
  {
    id: "RED001",
    userId: "coffee.lover@email.com",
    userName: "Coffee Lover",
    rewardId: "REW001",
    rewardName: "Free Nefo Original",
    pointsCost: 100,
    date: "2024-03-20T10:30:00",
    status: "pending"
  },
  {
    id: "RED002",
    userId: "john.doe@email.com",
    userName: "John Doe",
    rewardId: "REW002",
    rewardName: "Free Size Upgrade",
    pointsCost: 150,
    date: "2024-03-19T14:15:00",
    status: "completed"
  },
  {
    id: "RED003",
    userId: "jane.smith@email.com",
    userName: "Jane Smith",
    rewardId: "REW003",
    rewardName: "Free Croissant",
    pointsCost: 200,
    date: "2024-03-18T09:45:00",
    status: "pending"
  },
  {
    id: "RED004",
    userId: "coffee.lover@email.com",
    userName: "Coffee Lover",
    rewardId: "REW004",
    rewardName: "20% Off Next Order",
    pointsCost: 300,
    date: "2024-03-17T16:20:00",
    status: "completed"
  },
  {
    id: "RED005",
    userId: "john.doe@email.com",
    userName: "John Doe",
    rewardId: "REW005",
    rewardName: "Free Matcha Latte",
    pointsCost: 250,
    date: "2024-03-16T11:30:00",
    status: "cancelled"
  },
  {
    id: "RED006",
    userId: "jane.smith@email.com",
    userName: "Jane Smith",
    rewardId: "REW006",
    rewardName: "Free Cheesecake",
    pointsCost: 400,
    date: "2024-03-15T13:45:00",
    status: "pending"
  },
  {
    id: "RED007",
    userId: "mike.johnson@email.com",
    userName: "Mike Johnson",
    rewardId: "REW007",
    rewardName: "Free Caramel Macchiato",
    pointsCost: 180,
    date: "2024-03-14T08:20:00",
    status: "completed"
  },
  {
    id: "RED008",
    userId: "sarah.wilson@email.com",
    userName: "Sarah Wilson",
    rewardId: "REW008",
    rewardName: "Free Tiramisu",
    pointsCost: 350,
    date: "2024-03-13T15:10:00",
    status: "pending"
  },
  {
    id: "RED009",
    userId: "david.brown@email.com",
    userName: "David Brown",
    rewardId: "REW009",
    rewardName: "Free Strawberry Smoothie",
    pointsCost: 220,
    date: "2024-03-12T12:30:00",
    status: "completed"
  },
  {
    id: "RED010",
    userId: "emily.davis@email.com",
    userName: "Emily Davis",
    rewardId: "REW010",
    rewardName: "Free Chocolate Brownie",
    pointsCost: 280,
    date: "2024-03-11T19:45:00",
    status: "cancelled"
  },
  {
    id: "RED011",
    userId: "tom.wilson@email.com",
    userName: "Tom Wilson",
    rewardId: "REW011",
    rewardName: "Free Blueberry Muffin",
    pointsCost: 120,
    date: "2024-03-10T10:15:00",
    status: "pending"
  },
  {
    id: "RED012",
    userId: "lisa.anderson@email.com",
    userName: "Lisa Anderson",
    rewardId: "REW012",
    rewardName: "Free Cappuccino",
    pointsCost: 160,
    date: "2024-03-09T14:20:00",
    status: "completed"
  },
  {
    id: "RED013",
    userId: "coffee.lover@email.com",
    userName: "Coffee Lover",
    rewardId: "REW013",
    rewardName: "Free Apple Pie",
    pointsCost: 240,
    date: "2024-03-08T11:30:00",
    status: "pending"
  },
  {
    id: "RED014",
    userId: "john.doe@email.com",
    userName: "John Doe",
    rewardId: "REW014",
    rewardName: "Free Cinnamon Roll",
    pointsCost: 140,
    date: "2024-03-07T16:45:00",
    status: "completed"
  },
  {
    id: "RED015",
    userId: "jane.smith@email.com",
    userName: "Jane Smith",
    rewardId: "REW015",
    rewardName: "Free Lemon Cake",
    pointsCost: 200,
    date: "2024-03-06T09:20:00",
    status: "cancelled"
  },
  {
    id: "RED016",
    userId: "mike.johnson@email.com",
    userName: "Mike Johnson",
    rewardId: "REW016",
    rewardName: "Free Mango Tango",
    pointsCost: 190,
    date: "2024-03-05T13:10:00",
    status: "pending"
  },
  {
    id: "RED017",
    userId: "sarah.wilson@email.com",
    userName: "Sarah Wilson",
    rewardId: "REW017",
    rewardName: "Free Vanilla Milkshake",
    pointsCost: 170,
    date: "2024-03-04T18:30:00",
    status: "completed"
  },
  {
    id: "RED018",
    userId: "david.brown@email.com",
    userName: "David Brown",
    rewardId: "REW018",
    rewardName: "Free Pineapple Paradise",
    pointsCost: 210,
    date: "2024-03-03T12:15:00",
    status: "pending"
  },
  {
    id: "RED019",
    userId: "emily.davis@email.com",
    userName: "Emily Davis",
    rewardId: "REW019",
    rewardName: "Free Coconut Dream",
    pointsCost: 180,
    date: "2024-03-02T15:40:00",
    status: "completed"
  },
  {
    id: "RED020",
    userId: "tom.wilson@email.com",
    userName: "Tom Wilson",
    rewardId: "REW020",
    rewardName: "Free Banana Boost",
    pointsCost: 150,
    date: "2024-03-01T10:25:00",
    status: "cancelled"
  },
]

const ITEMS_PER_PAGE = 5

export default function AdminRedemptions({
  redemptionFilter = "all"
}: AdminRedemptionsProps) {
  const { toast } = useToast()
  const [redemptions, setRedemptions] = useState<Redemption[]>(dummyRedemptions)
  const [selectedRedemption, setSelectedRedemption] = useState<Redemption | null>(null)
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Filter redemptions based on status
    const filtered = dummyRedemptions.filter((redemption: Redemption) =>
      redemptionFilter === "all" || redemption.status === redemptionFilter
    )
    setRedemptions(
      filtered.sort((a: Redemption, b: Redemption) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    )
  }, [redemptionFilter])

  const handleStatusUpdate = (redemptionId: string, newStatus: "completed" | "cancelled") => {
    const updatedRedemptions = redemptions.map((redemption) =>
      redemption.id === redemptionId ? { ...redemption, status: newStatus } : redemption,
    )
    setRedemptions(updatedRedemptions)

    // Update selected redemption if it's the one being modified
    if (selectedRedemption && selectedRedemption.id === redemptionId) {
      setSelectedRedemption({ ...selectedRedemption, status: newStatus })
    }

    // Show toast notification
    const statusText = newStatus === "completed" ? "completed" : "cancelled"
    toast({
      variant: newStatus === "completed" ? "success" : "default",
      title: `Redemption ${statusText}`,
      description: `Redemption #${redemptionId} has been ${statusText} successfully.`,
    })
  }

  const handleViewRedemption = (redemption: Redemption) => {
    setSelectedRedemption(redemption)
    setShowRedemptionDialog(true)
  }

  // Pagination logic
  const totalPages = Math.ceil(redemptions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentRedemptions = redemptions.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Content */}
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Redemptions List */}
          <div className="max-w-6xl mx-auto space-y-4">
            {currentRedemptions.length === 0 ? (
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No Redemptions Yet</h3>
                  <p className="text-gray-500">User redemptions will appear here when customers redeem rewards.</p>
                </CardContent>
              </Card>
            ) : (
              currentRedemptions.map((redemption) => (
                <RedemptionCard
                  key={redemption.id}
                  redemption={redemption}
                  onView={handleViewRedemption}
                  onComplete={(id) => handleStatusUpdate(id, "completed")}
                  onCancel={(id) => handleStatusUpdate(id, "cancelled")}
                />
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <RedemptionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Redemption Details Dialog */}
          <RedemptionDetailsDialog
            open={showRedemptionDialog}
            onOpenChange={setShowRedemptionDialog}
            redemption={selectedRedemption}
            onComplete={(id) => handleStatusUpdate(id, "completed")}
            onCancel={(id) => handleStatusUpdate(id, "cancelled")}
          />
        </div>
      </div>
    </div>
  )
}
