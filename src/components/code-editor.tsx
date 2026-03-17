"use client"

import * as React from "react"

export function CodeEditor() {
  const [code, setCode] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = React.useRef<HTMLDivElement>(null)

  const lineCount = code.split("\n").length

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Preserve tab indentation
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = `${code.substring(0, start)}  ${code.substring(end)}`
      setCode(newValue)
      requestAnimationFrame(() => {
        textarea.selectionStart = start + 2
        textarea.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="flex flex-col w-[780px] bg-bg-input border border-border-primary rounded-lg overflow-hidden">
      {/* Window header */}
      <div className="flex items-center h-10 px-4 border-b border-border-primary shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent-red" />
          <span className="w-3 h-3 rounded-full bg-accent-amber" />
          <span className="w-3 h-3 rounded-full bg-accent-green" />
        </div>
      </div>

      {/* Editor body */}
      <div className="flex h-[360px] overflow-hidden">
        {/* Line numbers — scroll locked to textarea */}
        <div
          ref={lineNumbersRef}
          className="flex flex-col items-end bg-bg-surface border-r border-border-primary px-3 py-4 w-12 shrink-0 overflow-hidden select-none"
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <span
              key={i + 1}
              className="font-mono text-xs leading-5 text-text-tertiary"
              style={{ lineHeight: "20px" }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// paste your code here and prepare to be judged..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="flex-1 resize-none bg-transparent p-4 font-mono text-xs text-text-primary caret-accent-green outline-none scrollbar-hidden placeholder:text-text-tertiary"
          style={{ lineHeight: "20px" }}
        />
      </div>
    </div>
  )
}
