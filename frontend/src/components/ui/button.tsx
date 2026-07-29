import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-none border-2 border-[var(--color-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm font-medium text-[var(--color-fg)] transition-all outline-none select-none shadow-[2px_2px_0_rgba(0,0,0,0.8)] focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
        outline: "bg-[var(--color-card-bg)] text-[var(--color-fg)] border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]",
        secondary: "bg-[var(--color-card-bg)] text-[var(--color-accent)] border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
        ghost: "bg-transparent text-[var(--color-fg)] border-transparent hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]",
        destructive: "bg-transparent text-[var(--color-error)] border-[var(--color-error)] hover:bg-[var(--color-error)]/10",
        link: "bg-transparent text-[var(--color-accent)] underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-10 gap-2 px-3",
        xs: "h-8 gap-1 px-2 text-xs",
        sm: "h-9 gap-1 px-2.5 text-[0.8rem]",
        lg: "h-11 gap-2 px-4",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
  const Component = asChild ? "span" : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };