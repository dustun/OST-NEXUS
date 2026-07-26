import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-2 border-[#00ff00] bg-[#00ff00] px-3 py-2 text-sm font-medium text-[#000] transition-all outline-none select-none shadow-[2px_2px_0_rgba(0,0,0,0.8)] focus-visible:border-[#00ff00] focus-visible:ring-2 focus-visible:ring-[#00ff00]/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "bg-[#00ff00] text-[#000] border-[#00ff00] hover:bg-[#00cc00] hover:border-[#00cc00]",
        outline:
          "bg-[#111] text-[#00ff00] border-[#333] hover:bg-[#222] hover:text-[#00ff00]",
        secondary:
          "bg-[#111] text-[#00ff00] border-[#333] hover:bg-[#222] hover:text-[#00ff00]",
        ghost:
          "bg-transparent text-[#00ff00] border-transparent hover:bg-[#00ff00]/10 hover:text-[#00ff00]",
        destructive:
          "bg-[#000] text-[#ff0000] border-[#ff0000] hover:bg-[#ff0000]/10 focus-visible:border-[#ff0000] focus-visible:ring-[#ff0000]/30",
        link: "bg-transparent text-[#00ff00] underline-offset-4 hover:underline hover:text-[#00ff00] border-transparent",
      },
      size: {
        default: "h-10 gap-2 px-3",
        xs: "h-8 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 rounded-none px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-4",
        icon: "size-8 rounded-none",
        "icon-xs":
          "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-none [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-9 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
