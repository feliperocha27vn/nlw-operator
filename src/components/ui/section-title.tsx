import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const sectionTitleVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    slash: "font-mono text-sm font-bold text-(--accent-green)",
    text: "font-mono text-sm font-bold text-(--text-primary)",
  },
})

export interface SectionTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionTitleVariants> {}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    const styles = sectionTitleVariants()

    return (
      <div ref={ref} className={styles.root({ className })} {...props}>
        <span className={styles.slash()} aria-hidden="true">
          //
        </span>
        <span className={styles.text()}>{children}</span>
      </div>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

export { SectionTitle, sectionTitleVariants }
