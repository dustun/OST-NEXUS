import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-none border-2 border-[#333] bg-[#111] px-3 py-2 text-sm text-[#00ff00] placeholder:text-[#666] outline-none transition-all focus-visible:border-[#00ff00] focus-visible:ring-2 focus-visible:ring-[#00ff00]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#111]/70 disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

export { Input }
