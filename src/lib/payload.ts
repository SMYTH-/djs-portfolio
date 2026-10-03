import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getPageBySlug(
  slug: 'home' | 'work' | 'about' | 'contact',
) {
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
}

export async function getProjects({ featured }: { featured?: boolean } = {}) {
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
