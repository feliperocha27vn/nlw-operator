import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeBlock,
  DiffLine,
  SectionTitle,
  Toggle,
} from "@/components/ui"

export default async function ComponentsPage() {
  return (
    <div className="min-h-screen bg-(--bg-page) p-8">
      <div className="mx-auto max-w-6xl space-y-16">
        <header>
          <h1 className="text-4xl font-bold text-(--foreground)">
            Componentes UI
          </h1>
          <p className="mt-2 text-(--muted-foreground)">
            Exemplos de variantes dos componentes
          </p>
        </header>

        {/* Badge */}
        <section className="space-y-6">
          <SectionTitle>badge_status</SectionTitle>
          <div className="flex flex-wrap items-center gap-6">
            <Badge variant="critical">critical</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="good">good</Badge>
            <Badge variant="verdict">needs_serious_help</Badge>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-6">
          <SectionTitle>buttons</SectionTitle>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-mono text-(--muted-foreground) mb-3">
                Variants
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono text-(--muted-foreground) mb-3">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Toggle */}
        <section className="space-y-6">
          <SectionTitle>toggle</SectionTitle>
          <div className="flex flex-wrap items-center gap-8">
            <Toggle label="roast mode" checked={true} />
            <Toggle label="roast mode" checked={false} />
          </div>
        </section>

        {/* Card */}
        <section className="space-y-6">
          <SectionTitle>cards</SectionTitle>
          <Card className="max-w-[480px]">
            <CardHeader>
              <Badge variant="critical">critical</Badge>
            </CardHeader>
            <CardTitle>using var instead of const/let</CardTitle>
            <CardDescription>
              the var keyword is function-scoped rather than block-scoped,
              which can lead to unexpected behavior and bugs. modern javascript
              uses const for immutable bindings and let for mutable ones.
            </CardDescription>
          </Card>
        </section>

        {/* CodeBlock */}
        <section className="space-y-6">
          <SectionTitle>code_block</SectionTitle>
          <div className="max-w-[560px]">
            <CodeBlock
              code={`function calculateTotal() {\n  var items = [10, 20, 30];\n  return items.reduce((a, b) => a + b);\n}`}
              lang="javascript"
              showHeader={true}
            />
          </div>
        </section>

        {/* DiffLine */}
        <section className="space-y-6">
          <SectionTitle>diff_line</SectionTitle>
          <div className="max-w-[560px] flex flex-col">
            <DiffLine type="removed">var total = 0;</DiffLine>
            <DiffLine type="added">const total = 0;</DiffLine>
            <DiffLine type="context">return total;</DiffLine>
          </div>
        </section>
      </div>
    </div>
  )
}
