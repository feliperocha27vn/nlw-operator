import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-m)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default:
        "bg-[var(--accent-green)] text-[var(--bg-page)] hover:bg-[var(--accent-green)]/90",
      secondary:
        "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80",
      outline:
        "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]",
      ghost: "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
      destructive:
        "bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90",
    },
    size: {
      default: "h-10 px-6 py-2.5",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
