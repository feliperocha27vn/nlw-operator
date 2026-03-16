"use client"

import * as React from "react"
import { Switch } from "@base-ui/react/switch"
import { tv, type VariantProps } from "tailwind-variants"

const toggleVariants = tv({
  slots: {
    root: "inline-flex items-center gap-3",
    track:
      "relative flex h-[22px] w-10 items-center rounded-[11px] p-[3px] transition-colors duration-200 cursor-pointer data-[checked]:bg-(--accent-green) data-[unchecked]:bg-(--border-primary)",
    thumb:
      "h-4 w-4 rounded-full transition-all duration-200 data-[checked]:bg-[#0A0A0A] data-[checked]:translate-x-[18px] data-[unchecked]:bg-[#6B7280] data-[unchecked]:translate-x-0",
    label:
      "font-mono text-xs font-normal transition-colors duration-200 data-[checked]:text-(--accent-green) data-[unchecked]:text-(--text-secondary)",
  },
})

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Switch.Root>, "className">,
    VariantProps<typeof toggleVariants> {
  label?: string
  className?: string
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ label, className, ...props }, ref) => {
    const styles = toggleVariants()
    const [checked, setChecked] = React.useState(props.checked ?? false)

    const handleCheckedChange = (
      newChecked: boolean,
      eventDetails: {
        reason: "none"
        event: Event
        cancel: () => void
        allowPropagation: () => void
        isCanceled: boolean
        isPropagationAllowed: boolean
        trigger: Element | undefined
      }
    ) => {
      setChecked(newChecked)
      props.onCheckedChange?.(newChecked, eventDetails)
    }

    return (
      <div className={styles.root({ className })}>
        <Switch.Root
          ref={ref}
          {...props}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          className={styles.track()}
        >
          <Switch.Thumb className={styles.thumb()} />
        </Switch.Root>
        {label && (
          <span
            className={styles.label()}
            data-checked={checked ? "" : undefined}
            data-unchecked={!checked ? "" : undefined}
          >
            {label}
          </span>
        )}
      </div>
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
