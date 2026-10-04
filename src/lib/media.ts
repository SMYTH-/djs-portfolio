interface MappedSize {
  url: string
  width?: number
  height?: number
  mimeType?: string
}

export interface MappedImage {
  url: string
  width?: number
  height?: number
  mimeType?: string
  sizes?: Record<string, MappedSize>
}

/** Maps a populated Payload Media doc (or an unpopulated id/null) onto MediaSrc. */
export function toImageSrc(doc: unknown): MappedImage | undefined {
  if (!doc || typeof doc !== 'object') return undefined
  const media = doc as Record<string, unknown>
  if (typeof media.url !== 'string') return undefined

  const sizes: Record<string, MappedSize> = {}
  const rawSizes = media.sizes as
    | Record<string, Record<string, unknown> | null>
    | undefined
  if (rawSizes) {
    for (const [key, size] of Object.entries(rawSizes)) {
      if (size && typeof size.url === 'string') {
        sizes[key] = {
          url: size.url,
          width: typeof size.width === 'number' ? size.width : undefined,
          height: typeof size.height === 'number' ? size.height : undefined,
          mimeType: typeof size.mimeType === 'string' ? size.mimeType : undefined,
        }
      }
    }
  }

  return {
    url: media.url,
    width: typeof media.width === 'number' ? media.width : undefined,
    height: typeof media.height === 'number' ? media.height : undefined,
    mimeType: typeof media.mimeType === 'string' ? media.mimeType : undefined,
    sizes: Object.keys(sizes).length ? sizes : undefined,
  }
}

/** `doc.alt` when populated, else `fallback`. */
export function toAlt(doc: unknown, fallback = ''): string {
  if (
    doc &&
    typeof doc === 'object' &&
    typeof (doc as Record<string, unknown>).alt === 'string'
  ) {
    return (doc as Record<string, unknown>).alt as string
  }
  return fallback
}
