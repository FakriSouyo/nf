import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RedemptionPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function RedemptionPagination({
  currentPage,
  totalPages,
  onPageChange,
}: RedemptionPaginationProps) {
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
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
          onClick={() => onPageChange(page)}
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
  )
} 