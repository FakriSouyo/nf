import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1 text-sm shadow-xs transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200/20 dark:focus-visible:ring-gray-700/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-gray-300 dark:hover:border-gray-700",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
