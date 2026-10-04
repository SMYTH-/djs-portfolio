import Link from 'next/link'

import { Container } from '@/primitives'

import { Nav } from '../Nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-body font-normal text-foreground/70 transition-opacity hover:opacity-70"
        >
          Dominic Smyth
        </Link>
        <Nav />
      </Container>
    </header>
  )
}
