import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface OrderPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function OrderPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OrderPaginationProps) {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={currentPage === i ? "default" : "outline"}
          className={`min-w-[40px] h-10 ${
            currentPage === i ? "bg-[#2563eb] text-white" : "text-gray-600"
          }`}
        >
          {i}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {currentPage > 3 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className="min-w-[40px] h-10 text-gray-600"
          >
            1
          </Button>
          {currentPage > 4 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className="min-w-[40px] h-10 text-gray-600"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-600"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
} 