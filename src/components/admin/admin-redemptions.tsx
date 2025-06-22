"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Eye, CheckCircle, XCircle, Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Redemption {
  id: string
  userId: string
  userName: string
  rewardId: string
  rewardName: string
  pointsCost: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

interface AdminRedemptionsProps {
  redemptionFilter?: "all" | "pending" | "completed" | "cancelled"
}

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
    
    // Removed toast notification for filter changes
  }, [redemptionFilter, toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const statusLabels = {
    all: "All Redemptions",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
  }

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
                  <Card
                    key={redemption.id}
                    className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">Redemption #{redemption.id}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(redemption.date).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">Customer: {redemption.userName}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(redemption.status)}>
                            {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Reward:</span>
                          <span className="font-medium">{redemption.rewardName}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Points Used:</span>
                          <span className="font-medium">{redemption.pointsCost} points</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-[#2563eb]">User: {redemption.userName}</div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleViewRedemption(redemption)}
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {redemption.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(redemption.id, "completed")}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(redemption.id, "cancelled")}
                                variant="outline"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="text-[#2563eb] border-[#2563eb]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={
                      currentPage === page
                        ? "bg-[#2563eb] text-white"
                        : "text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="text-[#2563eb] border-[#2563eb]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Redemption Details Dialog */}
          <Dialog open={showRedemptionDialog} onOpenChange={setShowRedemptionDialog}>
            <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold text-[#2563eb]">Redemption Details</DialogTitle>
              </DialogHeader>

              {selectedRedemption && (
                <div className="space-y-6">
                  {/* Redemption Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Redemption #{selectedRedemption.id}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(selectedRedemption.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div>Customer: {selectedRedemption.userName}</div>
                      <div>Email: {selectedRedemption.userId}</div>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className={getStatusColor(selectedRedemption.status)}>
                        {selectedRedemption.status.charAt(0).toUpperCase() + selectedRedemption.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Reward Details */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">Reward Details:</h4>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Gift className="w-6 h-6 text-[#2563eb]" />
                        <div>
                          <h5 className="font-bold text-[#2563eb]">{selectedRedemption.rewardName}</h5>
                          <p className="text-sm text-gray-600">Reward ID: {selectedRedemption.rewardId}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#2563eb]">{selectedRedemption.pointsCost} Points</div>
                        <div className="text-sm text-gray-600">Points deducted from customer</div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  {selectedRedemption.status === "pending" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-800 mb-2">Instructions:</h4>
                      <p className="text-sm text-yellow-700">
                        Customer will show this redemption ID at the store. Please verify the ID and provide the reward to
                        complete this redemption.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setShowRedemptionDialog(false)}
                      variant="outline"
                      className="flex-1 text-gray-600 border-gray-300"
                    >
                      Close
                    </Button>
                    {selectedRedemption.status === "pending" && (
                      <>
                        <Button
                          onClick={() => {
                            handleStatusUpdate(selectedRedemption.id, "completed")
                            setShowRedemptionDialog(false)
                          }}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                        <Button
                          onClick={() => {
                            handleStatusUpdate(selectedRedemption.id, "cancelled")
                            setShowRedemptionDialog(false)
                          }}
                          variant="outline"
                          className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
