import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:opacity-90 px-5 py-2.5',
  secondary:
    'bg-transparent text-foreground border border-border hover:border-accent hover:text-accent px-5 py-2.5',
  ghost: 'bg-transparent text-accent hover:opacity-70',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-body',
  md: 'text-body',
  lg: 'text-body-lg',
}

export function Button({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-normal transition-opacity',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
