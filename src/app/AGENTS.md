# Padrões de Classes Tailwind CSS v4

## Escala de Espaçamento e Tamanhos

Tailwind CSS v4 usa escala de espaçamento em que **1 unidade = 0.25rem = 4px**.
Use sempre o utilitário numérico canônico quando o valor em pixels for divisível por 4.

### Regra: Nunca use `[Xpx]` se existir utilitário equivalente

```
// ✅ CORRETO — usa utilitário nativo
max-w-240    // = 960px  (960 / 4 = 240)
w-195        // = 780px  (780 / 4 = 195)
w-25         // = 100px  (100 / 4 = 25)
h-10         // = 40px   (40  / 4 = 10)
p-4          // = 16px   (16  / 4 = 4)

// ❌ ERRADO — valor arbitrário desnecessário
max-w-[960px]
w-[780px]
w-[100px]
h-[40px]
p-[16px]
```

### Quando usar `[Xpx]` é aceitável

Use a sintaxe arbitrária apenas quando o valor **não** for divisível por 4 e não
houver utilitário equivalente:

```
w-[50px]     // 50 / 4 = 12.5 — sem utilitário canônico
w-[70px]     // 70 / 4 = 17.5 — sem utilitário canônico
text-[13px]  // tamanho de fonte sem equivalente na escala padrão
```

### Tabela de referência rápida (px → unidade)

| px   | unidade | utilitário exemplo |
|------|---------|--------------------|
| 4    | 1       | `p-1`, `gap-1`     |
| 8    | 2       | `p-2`, `gap-2`     |
| 12   | 3       | `p-3`, `gap-3`     |
| 16   | 4       | `p-4`, `gap-4`     |
| 20   | 5       | `p-5`, `gap-5`     |
| 24   | 6       | `p-6`, `gap-6`     |
| 32   | 8       | `p-8`, `gap-8`     |
| 40   | 10      | `h-10`, `w-10`     |
| 48   | 12      | `h-12`, `w-12`     |
| 64   | 16      | `h-16`, `w-16`     |
| 80   | 20      | `h-20`, `w-20`     |
| 96   | 24      | `h-24`, `w-24`     |
| 100  | 25      | `w-25`             |
| 160  | 40      | `w-40`             |
| 320  | 80      | `max-w-80`         |
| 480  | 120     | `max-w-120`        |
| 640  | 160     | `max-w-160`        |
| 768  | 192     | `max-w-192`        |
| 780  | 195     | `w-195`            |
| 960  | 240     | `max-w-240`        |
| 1024 | 256     | `max-w-256`        |
| 1280 | 320     | `max-w-320`        |

## CSS Variables — Sintaxe Canônica

Use `text-(--var)` e `bg-(--var)` — **não** `text-[var(--var)]`.

```
// ✅ CORRETO
text-(--foreground)
bg-(--bg-page)

// ❌ ERRADO
text-[var(--foreground)]
bg-[var(--bg-page)]
```
