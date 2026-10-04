import type { ElementType, ReactNode } from 'react'

export type TextVariant =
  | 'hero'
  | 'sectionTitle'
  | 'eyebrow'
  | 'label'
  | 'body'
  | 'meta'
  | 'link'

export interface TextProps {
  children: ReactNode
  variant?: TextVariant
  as?: ElementType
  className?: string
}

const variantStyles: Record<TextVariant, string> = {
  hero: 'text-display-sm lg:text-display font-normal text-foreground max-w-[92%]',
  sectionTitle:
    'text-heading wide:text-heading-lg font-normal text-foreground',
  eyebrow: 'text-accent-sm uppercase font-normal text-foreground/70',
  label: 'text-body font-normal text-foreground',
  body: 'text-body-lg font-normal text-foreground',
  meta: 'text-body-sm font-normal text-foreground',
  link: 'text-body-lg font-normal text-accent underline decoration-accent underline-offset-4 hover:opacity-80',
}

export function Text({
  children,
  variant = 'body',
  as,
  className = '',
}: TextProps) {
  const Tag =
    as ??
    (variant === 'hero' || variant === 'sectionTitle'
      ? 'h1'
      : variant === 'label' || variant === 'eyebrow'
        ? 'p'
        : 'p')

  return (
    <Tag
      className={[variantStyles[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  )
}
