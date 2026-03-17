"use client"

import * as React from "react"
import { Switch } from "@base-ui/react/switch"
import { tv, type VariantProps } from "tailwind-variants"

const toggleVariants = tv({
  slots: {
    root: "inline-flex items-center gap-3",
    track:
      "relative flex h-[22px] w-10 items-center rounded-[11px] p-[3px] transition-colors duration-200 cursor-pointer data-[checked]:bg-accent-green data-[unchecked]:bg-border-primary",
    thumb:
      "h-4 w-4 rounded-full transition-all duration-200 data-[checked]:bg-[#0A0A0A] data-[checked]:translate-x-[18px] data-[unchecked]:bg-[#6B7280] data-[unchecked]:translate-x-0",
    label:
      "font-mono text-xs font-normal transition-colors duration-200 data-[checked]:text-accent-green data-[unchecked]:text-text-secondary",
  },
})

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ToggleContextValue {
  checked: boolean
}

const ToggleContext = React.createContext<ToggleContextValue>({ checked: false })

// ---------------------------------------------------------------------------
// Toggle — root wrapper
// ---------------------------------------------------------------------------

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Switch.Root>, "className">,
    VariantProps<typeof toggleVariants> {
  className?: string
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, children, ...props }, ref) => {
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
      <ToggleContext.Provider value={{ checked }}>
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
          {children}
        </div>
      </ToggleContext.Provider>
    )
  }
)
Toggle.displayName = "Toggle"

// ---------------------------------------------------------------------------
// ToggleLabel — reads checked state from context
// ---------------------------------------------------------------------------

export interface ToggleLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ToggleLabel = React.forwardRef<HTMLSpanElement, ToggleLabelProps>(
  ({ className, children, ...props }, ref) => {
    const styles = toggleVariants()
    const { checked } = React.useContext(ToggleContext)

    return (
      <span
        ref={ref}
        className={styles.label({ className })}
        data-checked={checked ? "" : undefined}
        data-unchecked={!checked ? "" : undefined}
        {...props}
      >
        {children}
      </span>
    )
  }
)
ToggleLabel.displayName = "ToggleLabel"

export { Toggle, ToggleLabel, toggleVariants }
