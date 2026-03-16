import * as React from "react"
import type { BundledLanguage, BundledTheme } from "shiki"
import { codeToHtml } from "shiki"
import { tv, type VariantProps } from "tailwind-variants"

const codeBlockVariants = tv({
  slots: {
    root: "flex flex-col bg-(--bg-input) border border-(--border-primary) rounded-lg overflow-hidden w-full",
    header:
      "flex items-center h-10 px-4 border-b border-(--border-primary) font-mono text-xs text-(--text-tertiary)",
    body: "p-4 overflow-x-auto",
    pre: "!bg-transparent !p-0 !m-0",
    code: "font-mono text-[13px]",
  },
})

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  code: string
  lang: BundledLanguage
  theme?: BundledTheme
  showHeader?: boolean
  showLineNumbers?: boolean
}

async function CodeBlock({
  code,
  lang,
  theme = "vesper",
  showHeader = true,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const styles = codeBlockVariants()

  // Calculate line count
  const lineCount = code.trim().split("\n").length

  // Generate highlighted HTML
  const html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [
      {
        pre(node) {
          // Remove default padding and margin from pre element
          node.properties.class = styles.pre()
        },
        code(node) {
          node.properties.class = styles.code()
        },
      },
    ],
  })

  return (
    <div className={styles.root({ className })} {...props}>
      {showHeader && (
        <div className={styles.header()}>
          lang: {lang} · {lineCount} {lineCount === 1 ? "line" : "lines"}
        </div>
      )}
      <div
        className={styles.body()}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
CodeBlock.displayName = "CodeBlock"

export { CodeBlock, codeBlockVariants }
