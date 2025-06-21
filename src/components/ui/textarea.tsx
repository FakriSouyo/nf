import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        "hover:border-gray-300 dark:hover:border-gray-700",
        "focus:border-gray-300 focus:ring-2 focus:ring-gray-200/20 dark:focus:border-gray-600 dark:focus:ring-gray-700/20",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
