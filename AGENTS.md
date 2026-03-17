# AGENTS.md — nlw-operator (devroast)

## Projeto

App web onde o usuário cola código e recebe uma avaliação brutal (roast) gerada por IA.
**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · `tailwind-variants` · `@base-ui/react` · Shiki

## Estrutura

```
src/
├── app/                  # Rotas (App Router)
│   ├── globals.css       # Tema, variáveis de cor, utilitários globais
│   ├── layout.tsx        # Root layout (Navbar)
│   ├── page.tsx          # Home — editor + leaderboard
│   └── components/       # Rota /components — showcase de UI
├── components/
│   ├── navbar.tsx        # Server Component
│   ├── code-editor.tsx   # Client Component — editor digitável
│   └── ui/               # Design system (ver AGENTS.md interno)
```

## Padrões globais

### Tailwind CSS v4
- Variáveis de cor em `@theme` com prefixo `--color-*` → geram utilitários automaticamente (`bg-accent-green`, `text-foreground`)
- **Nunca** use `bg-[var(--x)]` — use `bg-(--x)` (sintaxe canônica v4)
- **Nunca** use `w-[Xpx]` quando `X ÷ 4` for inteiro — use o utilitário numérico (`w-25` = 100px, `max-w-240` = 960px)
- Light mode: sobrescreve variáveis em `[data-theme="light"]` dentro de `@layer base`

### Componentes UI (`src/components/ui/`)
- Sempre `React.forwardRef` + `displayName`
- Sempre named exports — nunca `export default`
- Sempre `tailwind-variants` (`tv()`) para variantes — nunca `cn()` ou `twMerge()`
- Sempre atualizar `src/components/ui/index.ts` ao criar componentes
- Padrão de composição: sub-componentes explícitos ao invés de props flat

### TypeScript / Geral
- Linter/formatter: Biome (`npx biome check`)
- Sem `any` implícito
- Props de componentes estendem as props nativas do elemento HTML correspondente
