import * as React from "react"
import type { BundledLanguage, BundledTheme } from "shiki"
import { codeToHtml } from "shiki"
import { tv, type VariantProps } from "tailwind-variants"

const codeBlockVariants = tv({
  slots: {
    root: "flex flex-col bg-bg-input border border-border-primary rounded-lg overflow-hidden w-full",
    header:
      "flex items-center h-10 px-4 border-b border-border-primary font-mono text-xs text-text-tertiary",
    body: "p-4 overflow-x-auto",
    pre: "!bg-transparent !p-0 !m-0",
    code: "font-mono text-[13px]",
  },
})

// ---------------------------------------------------------------------------
// CodeBlock — root container
// ---------------------------------------------------------------------------

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, children, ...props }, ref) => {
    const styles = codeBlockVariants()
    return (
      <div ref={ref} className={styles.root({ className })} {...props}>
        {children}
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

// ---------------------------------------------------------------------------
// CodeBlockHeader — lang + line count bar
// ---------------------------------------------------------------------------

export interface CodeBlockHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  lang: BundledLanguage
  lineCount: number
}

const CodeBlockHeader = React.forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ lang, lineCount, className, ...props }, ref) => {
    const styles = codeBlockVariants()
    return (
      <div ref={ref} className={styles.header({ className })} {...props}>
        lang: {lang} · {lineCount} {lineCount === 1 ? "line" : "lines"}
      </div>
    )
  }
)
CodeBlockHeader.displayName = "CodeBlockHeader"

// ---------------------------------------------------------------------------
// CodeBlockBody — syntax-highlighted code (async Server Component)
// ---------------------------------------------------------------------------

export interface CodeBlockBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  code: string
  lang: BundledLanguage
  theme?: BundledTheme
}

async function CodeBlockBody({
  code,
  lang,
  theme = "vesper",
  className,
  ...props
}: CodeBlockBodyProps) {
  const styles = codeBlockVariants()

  const html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      {
        pre(node) {
          node.properties.class = styles.pre()
        },
        code(node) {
          node.properties.class = styles.code()
        },
      },
    ],
  })

  return (
    <div
      className={styles.body({ className })}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  )
}
CodeBlockBody.displayName = "CodeBlockBody"

export { CodeBlock, CodeBlockHeader, CodeBlockBody, codeBlockVariants }
