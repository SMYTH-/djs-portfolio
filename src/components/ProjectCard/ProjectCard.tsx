import Link from 'next/link'

import { Media, type MediaSrc, Text } from '@/primitives'

export interface ProjectCardProps {
  title: string
  href: string
  summary?: string | null
  imageSrc?: MediaSrc | string | null
  imageAlt?: string
}

export function ProjectCard({
  title,
  href,
  summary,
  imageSrc,
  imageAlt = title,
}: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <Link href={href} className="group block">
        <div className="relative aspect-video w-full overflow-hidden bg-foreground/5 transition-opacity group-hover:opacity-90">
          <Media
            src={imageSrc || '/media/placeholder.svg'}
            alt={imageAlt}
            sizes="(max-width: 768px) 100vw, 600px"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <Text variant="meta" as="h3" className="font-medium">
            {title}
          </Text>
          {summary ? (
            <Text variant="meta" as="p" className="text-muted">
              {summary}
            </Text>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
