import type { ReactNode } from 'react'

import { Container } from '@/primitives/Container'

type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg'
type SpacingValue =
  | SpacingToken
  | {
      top?: SpacingToken
      bottom?: SpacingToken
    }

export interface SectionBandProps {
  spacing?: SpacingValue
  innerSpacing?: SpacingValue
  background?: 'none' | 'subtle'
  bleed?: boolean
  width?: 'content' | 'full'
  mobileBleed?: boolean
}

export interface SectionProps extends SectionBandProps {
  children: ReactNode
  theme?: 'light' | 'dark'
  layout?: 'none' | 'stack'
  className?: string
}

const spacingClass: Record<SpacingToken, string> = {
  none: '',
  xs: 'py-section-xs',
  sm: 'py-section-sm',
  md: 'py-section-md',
  lg: 'py-section',
}

function spacingClasses(spacing?: SpacingValue): string {
  if (!spacing || spacing === 'none') return ''
  if (typeof spacing === 'string') return spacingClass[spacing]
  const top = spacing.top ? spacingClass[spacing.top].replace('py-', 'pt-') : ''
  const bottom = spacing.bottom
    ? spacingClass[spacing.bottom].replace('py-', 'pb-')
    : ''
  return [top, bottom].filter(Boolean).join(' ')
}

export function Section({
  children,
  theme = 'light',
  spacing,
  background = 'none',
  bleed = false,
  width = 'content',
  mobileBleed = false,
  className = '',
}: SectionProps) {
  const bandClass = [
    spacingClasses(spacing),
    background === 'subtle' ? 'bg-foreground/5' : '',
    theme === 'dark' ? 'bg-foreground text-background' : '',
    mobileBleed ? 'max-lg:px-0' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (bleed || width === 'full') {
    return (
      <section
        className={bandClass}
        data-mobile-bleed={mobileBleed ? '' : undefined}
      >
        {children}
      </section>
    )
  }

  return (
    <section
      className={bandClass}
      data-mobile-bleed={mobileBleed ? '' : undefined}
    >
      <Container>{children}</Container>
    </section>
  )
}
