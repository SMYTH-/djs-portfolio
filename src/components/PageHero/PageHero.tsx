import type { ReactNode } from 'react'

import { Link, Text } from '@/primitives'

export interface PageHeroProps {
  headline: ReactNode
  /** Small line above the headline, e.g. "WEB ENGINEER · LONDON". */
  eyebrow?: string | null
  /** Supporting sentence under the headline. */
  description?: string | null
  /** Primary text CTA under the description. */
  cta?: { href: string; label: string } | null
  metaName?: string | null
  metaRole?: string | null
}

export function PageHero({
  headline,
  eyebrow,
  description,
  cta,
  metaName,
  metaRole,
}: PageHeroProps) {
  return (
    <header className="flex flex-col gap-4">
      {eyebrow ? (
        <Text variant="eyebrow" as="p">
          {eyebrow}
        </Text>
      ) : null}

      <Text variant="hero" as="h1">
        {headline}
      </Text>

      {description ? (
        <Text variant="body" as="p" className="max-w-xl text-foreground/80">
          {description}
        </Text>
      ) : null}

      {cta ? (
        <div>
          <Link href={cta.href} className="text-body-lg">
            {cta.label}
          </Link>
        </div>
      ) : null}

      {!eyebrow && (metaName || metaRole) ? (
        <div className="flex flex-col gap-1">
          {metaName ? (
            <Text variant="meta" as="p" className="font-medium">
              {metaName}
            </Text>
          ) : null}
          {metaRole ? (
            <Text variant="meta" as="p" className="text-foreground/70">
              {metaRole}
            </Text>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
