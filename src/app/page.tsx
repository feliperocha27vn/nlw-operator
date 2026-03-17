import Link from "next/link"
import { Button, SectionTitle, Toggle, ToggleLabel } from "@/components/ui"
import { CodeEditor } from "@/components/code-editor"

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const LEADERBOARD_ROWS = [
  {
    rank: "1",
    rankColor: "text-accent-amber",
    score: "1.2",
    lang: "javascript",
    lines: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
    commentLines: [2],
  },
  {
    rank: "2",
    rankColor: "text-text-secondary",
    score: "1.8",
    lang: "typescript",
    lines: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
    commentLines: [],
  },
  {
    rank: "3",
    rankColor: "text-text-secondary",
    score: "2.1",
    lang: "sql",
    lines: [
      "SELECT * FROM users WHERE 1=1",
      "-- TODO: add authentication",
    ],
    commentLines: [1],
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 pt-20 pb-16 px-10">

      {/* ── Hero ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-accent-green">$</span>
          <h1 className="font-mono text-4xl font-bold text-text-primary">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-mono text-sm text-text-secondary">
          // drop your code below and we&apos;ll rate it — brutally honest or full roast mode
        </p>
      </div>

      {/* ── Code Editor ── */}
      <CodeEditor />

      {/* ── Actions Bar ── */}
      <div className="flex items-center justify-between w-195">
        <div className="flex items-center gap-4">
          <Toggle checked={false}>
            <ToggleLabel>roast mode</ToggleLabel>
          </Toggle>
          <span className="font-mono text-xs text-text-tertiary">
            // maximum sarcasm enabled
          </span>
        </div>
        <Button variant="default" size="default" rounded="none">
          $ roast_my_code
        </Button>
      </div>

      {/* ── Footer Hint ── */}
      <div className="flex items-center justify-center gap-6">
        <span className="font-mono text-xs text-text-tertiary">2,847 codes roasted</span>
        <span className="font-mono text-xs text-text-tertiary">·</span>
        <span className="font-mono text-xs text-text-tertiary">avg score: 4.2/10</span>
      </div>

      {/* ── Spacer ── */}
      <div className="h-8 w-full" />

      {/* ── Leaderboard Preview ── */}
      <div className="flex flex-col gap-6 w-full max-w-240">
        {/* Title row */}
        <div className="flex items-center justify-between w-full">
          <SectionTitle>shame_leaderboard</SectionTitle>
          <Link
            href="#"
            className="font-mono text-xs text-text-secondary hover:text-text-primary transition-colors border border-border-primary px-3 py-1.5"
          >
            $ view_all &gt;&gt;
          </Link>
        </div>

        {/* Subtitle */}
        <p className="font-mono text-[13px] text-text-tertiary -mt-2">
          // the worst code on the internet, ranked by shame
        </p>

        {/* Table */}
        <div className="border border-border-primary w-full">
          {/* Table header */}
          <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border-primary">
            <div className="w-[50px] shrink-0">
              <span className="font-mono text-xs font-medium text-text-tertiary">#</span>
            </div>
            <div className="w-[70px] shrink-0">
              <span className="font-mono text-xs font-medium text-text-tertiary">score</span>
            </div>
            <div className="flex-1">
              <span className="font-mono text-xs font-medium text-text-tertiary">code</span>
            </div>
            <div className="w-25 shrink-0">
              <span className="font-mono text-xs font-medium text-text-tertiary">lang</span>
            </div>
          </div>

          {/* Rows */}
          {LEADERBOARD_ROWS.map((row, i) => (
            <div
              key={row.rank}
              className={`flex items-start px-5 py-4 ${i < LEADERBOARD_ROWS.length - 1 ? "border-b border-border-primary" : ""}`}
            >
              <div className="w-[50px] shrink-0 pt-0.5">
                <span className={`font-mono text-xs ${row.rankColor}`}>{row.rank}</span>
              </div>
              <div className="w-[70px] shrink-0 pt-0.5">
                <span className="font-mono text-xs font-bold text-accent-red">{row.score}</span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                {row.lines.map((line, j) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={j}
                    className={`font-mono text-xs ${row.commentLines.includes(j) ? "text-[#8B8B8B]" : "text-text-primary"}`}
                  >
                    {line}
                  </span>
                ))}
              </div>
              <div className="w-25 shrink-0 pt-0.5">
                <span className="font-mono text-xs text-text-secondary">{row.lang}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fade hint */}
        <div className="flex justify-center py-4">
          <span className="font-mono text-xs text-text-tertiary">
            showing top 3 of 2,847 ·{" "}
            <Link
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              view full leaderboard &gt;&gt;
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
