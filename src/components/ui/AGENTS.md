# Padrões de Criação de Componentes UI

## Regras Gerais

### 1. Named Exports (SEMPRE)
- **NUNCA** use `export default`
- **SEMPRE** use named exports para componentes e suas variants

```typescript
// ✅ CORRETO
export { Button, buttonVariants }
export type { ButtonProps }

// ❌ ERRADO
export default Button
```

### 2. TypeScript
- Estenda as propriedades nativas do elemento HTML correspondente
- Use `VariantProps` do `tailwind-variants` para tipar as variants

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

### 3. Tailwind Variants
- Use `tailwind-variants` para criar variantes de componentes
- **NÃO** use `twMerge` ou `cn` quando usar `tailwind-variants`
- Passe `className` diretamente como propriedade - o `tailwind-variants` faz o merge automaticamente

```typescript
// ✅ CORRETO
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "classe-base",
  variants: {
    variant: {
      default: "classes-default",
      secondary: "classes-secondary",
    },
    size: {
      default: "h-10 px-6",
      sm: "h-9 px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

// No componente
<button className={buttonVariants({ variant, size, className })} />

// ❌ ERRADO - NÃO use cn() ou twMerge()
import { cn } from "@/lib/utils"
<button className={cn(buttonVariants({ variant, size }), className)} />
```

### 4. CSS Variables no Tailwind CSS v4
- Use a sintaxe canônica `text-(--variable-name)` ao invés de `text-[var(--variable-name)]`
- Use a sintaxe canônica `bg-(--variable-name)` ao invés de `bg-[var(--variable-name)]`
- Aplica-se a todas as propriedades: `border-(--var)`, `fill-(--var)`, etc.

```typescript
// ✅ CORRETO - Sintaxe canônica do Tailwind v4
<div className="bg-(--bg-page) text-(--foreground)">
<p className="text-(--muted-foreground)">

// ❌ ERRADO - Sintaxe antiga
<div className="bg-[var(--bg-page)] text-[var(--foreground)]">
<p className="text-[var(--muted-foreground)]">
```

### 5. React.forwardRef
- Use `React.forwardRef` para permitir acesso ao elemento DOM
- Defina `displayName` para melhor debugging

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
```

### 6. Barrel Exports (index.ts)
- Exporte componentes e tipos no arquivo `index.ts`
- Facilita imports de múltiplos componentes

```typescript
// src/components/ui/index.ts
export { Button, buttonVariants } from "./button"
export type { ButtonProps } from "./button"
```

## Estrutura de Arquivo Padrão

```typescript
import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

// 1. Definir variants com tailwind-variants
const componentVariants = tv({
  base: "classes-base",
  variants: {
    // suas variants aqui
  },
  defaultVariants: {
    // valores padrão
  },
})

// 2. Interface estendendo props nativas + VariantProps
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

// 3. Componente com forwardRef
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...variants, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={componentVariants({ ...variants, className })}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

// 4. Named exports
export { Component, componentVariants }
```

## Checklist para Novos Componentes

- [ ] Usa `tailwind-variants` para variants
- [ ] NÃO usa `cn()` ou `twMerge()` - passa `className` direto
- [ ] Usa sintaxe canônica para CSS variables: `text-(--var)` ao invés de `text-[var(--var)]`
- [ ] Estende propriedades nativas do HTML
- [ ] Usa `React.forwardRef`
- [ ] Define `displayName`
- [ ] Usa **APENAS** named exports
- [ ] Exporta componente e variants
- [ ] Atualiza `index.ts` com os exports
- [ ] TypeScript tipado corretamente com `VariantProps`
