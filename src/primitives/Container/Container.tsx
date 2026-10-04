import type { ElementType, ReactNode } from 'react'

export interface ContainerProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

export function Container({
  children,
  as: Tag = 'div',
  className = '',
}: ContainerProps) {
  return (
    <Tag
      className={['mx-auto w-full max-w-content px-page', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
