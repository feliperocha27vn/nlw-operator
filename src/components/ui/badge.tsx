import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const badgeVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    dot: "w-2 h-2 rounded-full",
    text: "font-mono text-xs font-normal",
  },
  variants: {
    variant: {
      critical: {
        dot: "bg-accent-red",
        text: "text-accent-red",
      },
      warning: {
        dot: "bg-accent-amber",
        text: "text-accent-amber",
      },
      good: {
        dot: "bg-accent-green",
        text: "text-accent-green",
      },
      verdict: {
        dot: "bg-accent-red",
        text: "text-accent-red text-[13px]",
      },
    },
  },
  defaultVariants: {
    variant: "good",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    const styles = badgeVariants({ variant })

    return (
      <div ref={ref} className={styles.root({ className })} {...props}>
        <span className={styles.dot()} aria-hidden="true" />
        <span className={styles.text()}>{children}</span>
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
