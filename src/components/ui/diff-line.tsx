import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const diffLineVariants = tv({
  base: "flex items-center gap-2 px-4 py-2 font-mono text-sm w-full",
  variants: {
    type: {
      added: "bg-[#0A1A0F] text-(--accent-green)",
      removed: "bg-[#1A0A0A] text-(--accent-red)",
      context: "bg-transparent text-(--foreground)",
    },
  },
  defaultVariants: {
    type: "context",
  },
})

export interface DiffLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  symbol?: string
}

const DiffLine = React.forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, type, symbol, children, ...props }, ref) => {
    const defaultSymbol =
      type === "added" ? "+" : type === "removed" ? "-" : " "

    return (
      <div ref={ref} className={diffLineVariants({ type, className })} {...props}>
        <span className="select-none opacity-70" aria-hidden="true">
          {symbol ?? defaultSymbol}
        </span>
        <span className="flex-1">{children}</span>
      </div>
    )
  }
)
DiffLine.displayName = "DiffLine"

export { DiffLine, diffLineVariants }
