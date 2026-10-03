'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
        {links.map(({ href, label }) => {
          const isActive =
            href === '/' ? pathname === href : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={[
                'text-sm font-normal transition-opacity hover:opacity-70',
                isActive
                  ? 'text-foreground underline underline-offset-4'
                  : 'text-foreground/55',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <button
        type="button"
        className="relative flex h-5 w-5 items-center justify-center md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={[
            'block h-[3px] w-5 rounded-full bg-accent transition-transform',
            open ? 'rotate-45' : '',
          ].join(' ')}
        />
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <nav className="mx-auto flex max-w-[var(--content-max)] flex-col gap-4 px-[var(--gutter-mobile)] py-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-base text-foreground"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
