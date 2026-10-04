import config from '@payload-config'
import { getPayload } from 'payload'

import type { Page, Project } from '@/payload-types'

import { toImageSrc } from './media'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getPageBySlug(
  slug: 'home' | 'work' | 'about' | 'contact',
): Promise<Page | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1,
    })

    return result.docs[0] ?? null
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'cause' in error
        ? (error.cause as { code?: string } | undefined)?.code
        : undefined
    if (code === 'ECONNREFUSED') {
      console.warn(
        `[payload] DB unavailable for pages/${slug} — is the Railway tunnel up? (npm run db:tunnel)`,
      )
    } else {
      console.error(`[payload] getPageBySlug(${slug}) failed:`, error)
    }
    return null
  }
}

export async function getProjects({
  featured,
}: {
  featured?: boolean
} = {}): Promise<Project[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: featured
        ? {
            featured: {
              equals: true,
            },
          }
        : undefined,
      sort: '-publishedAt',
      depth: 1,
      limit: 24,
    })

    return result.docs
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'cause' in error
        ? (error.cause as { code?: string } | undefined)?.code
        : undefined
    if (code === 'ECONNREFUSED') {
      console.warn(
        '[payload] DB unavailable for projects — is the Railway tunnel up? (npm run db:tunnel)',
      )
    } else {
      console.error('[payload] getProjects failed:', error)
    }
    return []
  }
}

export function mediaUrl(
  media:
    | {
        url?: string | null
      }
    | number
    | null
    | undefined,
) {
  if (!media || typeof media === 'number') return null
  return media.url ?? null
}

/** Prefer a mapped CMS image object (with WebP sizes) when the relation is populated. */
export function mediaSrc(
  media:
    | {
        url?: string | null
        sizes?: Record<string, unknown>
      }
    | number
    | null
    | undefined,
) {
  return toImageSrc(media) ?? null
}
