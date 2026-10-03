import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import { SiteFooter, SiteHeader } from '@/components'

import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Dom Smyth',
    template: '%s · Dom Smyth',
  },
  description: 'Portfolio',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="flex-1 py-10 md:py-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
