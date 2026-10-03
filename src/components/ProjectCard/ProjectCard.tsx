import Link from 'next/link'

import { MediaFrame, Text } from '@/primitives'

export interface ProjectCardProps {
  title: string
  href: string
  summary?: string | null
  imageSrc?: string | null
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
        <MediaFrame
          src={imageSrc || '/media/placeholder.svg'}
          alt={imageAlt}
          className="transition-opacity group-hover:opacity-90"
        />
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
