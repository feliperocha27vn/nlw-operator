import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const cardVariants = tv({
  slots: {
    root: "flex flex-col gap-3 p-5 border border-border-primary rounded-lg",
    header: "flex items-center gap-2",
    title: "font-mono text-[13px] font-normal text-text-primary",
    description: "font-sans text-xs leading-relaxed text-text-secondary",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const styles = cardVariants()
    return (
      <div ref={ref} className={styles.root({ className })} {...props}>
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const styles = cardVariants()
    return (
      <div ref={ref} className={styles.header({ className })} {...props}>
        {children}
      </div>
    )
  }
)
CardHeader.displayName = "CardHeader"

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    const styles = cardVariants()
    return (
      <h3 ref={ref} className={styles.title({ className })} {...props}>
        {children}
      </h3>
    )
  }
)
CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  const styles = cardVariants()
  return (
    <p ref={ref} className={styles.description({ className })} {...props}>
      {children}
    </p>
  )
})
CardDescription.displayName = "CardDescription"

export { Card, CardHeader, CardTitle, CardDescription, cardVariants }
