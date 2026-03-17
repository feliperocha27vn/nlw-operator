import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-m) text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ring) disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default:
        "bg-accent-green text-bg-page hover:bg-accent-green/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-border bg-transparent hover:bg-muted",
      ghost: "hover:bg-muted hover:text-foreground",
      destructive:
        "bg-destructive text-white hover:bg-destructive/90",
    },
    size: {
      default: "h-10 px-6 py-2.5",
      sm:      "h-9 rounded-md px-3",
      lg:      "h-11 rounded-md px-8",
      icon:    "h-10 w-10",
    },
    rounded: {
      default: "",
      none:    "rounded-none",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, rounded, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
