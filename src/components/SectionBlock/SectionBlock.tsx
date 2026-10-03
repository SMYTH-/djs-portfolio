import type { ReactNode } from 'react'

import { Text } from '@/primitives'

export interface SectionBlockProps {
  label?: string
  title: string
  children?: ReactNode
  className?: string
}

export function SectionBlock({
  label,
  title,
  children,
  className = '',
}: SectionBlockProps) {
  return (
    <section className={['flex flex-col gap-6', className].filter(Boolean).join(' ')}>
      {label ? (
        <Text variant="label" as="p">
          {label}
        </Text>
      ) : null}
      <Text variant="sectionTitle" as="h2">
        {title}
      </Text>
      {children}
    </section>
  )
}
