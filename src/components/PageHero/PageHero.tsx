import { Text } from '@/primitives'

export interface PageHeroProps {
  headline: string
  metaName?: string | null
  metaRole?: string | null
}

export function PageHero({ headline, metaName, metaRole }: PageHeroProps) {
  return (
    <header className="flex flex-col gap-6">
      <Text variant="hero" as="h1">
        {headline}
      </Text>
      {metaName || metaRole ? (
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
