import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-none border-2 border-[var(--color-border)] bg-[var(--color-input-bg)] px-3 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)] outline-none transition-all focus-visible:border-[var(--color-input-focus)] focus-visible:ring-2 focus-visible:ring-[var(--color-input-focus)]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-input-bg)]/70 disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

export { Input }
