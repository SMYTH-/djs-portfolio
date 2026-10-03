import NextLink from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export interface LinkProps extends Omit<ComponentProps<typeof NextLink>, 'className'> {
  children: ReactNode
  className?: string
  underline?: boolean
}

export function Link({
  children,
  className = '',
  underline = true,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={[
        'text-accent transition-opacity hover:opacity-80',
        underline ? 'underline-offset-4 hover:underline' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </NextLink>
  )
}
