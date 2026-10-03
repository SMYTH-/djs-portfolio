import type { ElementType, ReactNode } from 'react'

export type TextVariant =
  | 'hero'
  | 'sectionTitle'
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
  hero: 'text-[2rem] leading-[2.444rem] md:text-[2.667rem] md:leading-[3.111rem] font-normal text-foreground max-w-[92%]',
  sectionTitle:
    'text-[2rem] leading-[2.444rem] md:text-[2.667rem] md:leading-[3.111rem] font-normal text-foreground',
  label: 'text-[12px] leading-4 font-normal text-foreground',
  body: 'text-base leading-[30px] font-normal text-foreground',
  meta: 'text-[14px] leading-5 font-normal text-foreground',
  link: 'text-base leading-[30px] font-normal text-accent underline-offset-4 hover:underline',
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
      : variant === 'label'
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
