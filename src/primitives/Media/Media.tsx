import NextImage, { type StaticImageData } from 'next/image'

export interface ImageSource {
  url: string
  width?: number
  height?: number
  mimeType?: string
}

export interface ResponsiveImageSource extends ImageSource {
  sizes?: Record<string, ImageSource | null | undefined>
}

export type MediaSrc =
  | string
  | StaticImageData
  | ResponsiveImageSource
  | {
      url?: string | null
      src?: string
      width?: number | null
      height?: number | null
      alt?: string | null
      mimeType?: string | null
      sizes?: Record<string, ImageSource | null | undefined>
    }

export interface MediaProps {
  src: MediaSrc
  alt?: string
  priority?: boolean
  sizes?: string
  className?: string
}

function aspectRatio(source: ImageSource): number | undefined {
  if (!source.width || !source.height) return undefined
  return source.width / source.height
}

function isWebp(source: ImageSource): boolean {
  if (source.mimeType) return source.mimeType === 'image/webp'
  return /\.webp(?:$|\?)/i.test(source.url)
}

function isResponsiveSource(src: MediaSrc): src is ResponsiveImageSource {
  return (
    typeof src === 'object' &&
    src != null &&
    'url' in src &&
    typeof (src as ResponsiveImageSource).url === 'string'
  )
}

function listedRenditions(
  source: ResponsiveImageSource,
): Array<ImageSource & { width: number }> {
  const originalAspect = aspectRatio(source)
  return Object.values(source.sizes ?? {}).filter(
    (rendition): rendition is ImageSource & { width: number } => {
      if (!rendition?.url || !rendition.width) return false
      if (originalAspect == null) return true
      const renditionAspect = aspectRatio(rendition)
      if (renditionAspect == null) return true
      return Math.abs(renditionAspect - originalAspect) <= 0.08
    },
  )
}

function buildSrcSet(source: ResponsiveImageSource): string | undefined {
  const renditions = listedRenditions(source)
  const byWidth = new Map<number, string>()
  for (const rendition of renditions.sort((a, b) => a.width - b.width)) {
    const existing = byWidth.get(rendition.width)
    if (!existing || isWebp(rendition)) byWidth.set(rendition.width, rendition.url)
  }
  if (byWidth.size < 2) return undefined
  return [...byWidth].map(([width, url]) => `${url} ${width}w`).join(', ')
}

/** Largest WebP rendition when available, so the fallback `src` isn't a heavy PNG. */
function displaySource(source: ResponsiveImageSource): ImageSource {
  const webps = listedRenditions(source).filter(isWebp)
  if (webps.length === 0) return source
  const largest = webps.reduce((best, next) =>
    next.width > best.width ? next : best,
  )
  return { url: largest.url, width: source.width, height: source.height }
}

function normalizeCmsSource(src: MediaSrc): ResponsiveImageSource | null {
  if (typeof src === 'string' || (typeof src === 'object' && src && 'src' in src && !('url' in src))) {
    return null
  }
  if (!isResponsiveSource(src)) {
    const objectSrc = src as {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      sizes?: Record<string, ImageSource | null | undefined>
    }
    if (!objectSrc.url) return null
    return {
      url: objectSrc.url,
      width: objectSrc.width ?? undefined,
      height: objectSrc.height ?? undefined,
      mimeType: objectSrc.mimeType ?? undefined,
      sizes: objectSrc.sizes,
    }
  }
  return src
}

export function Media({
  src,
  alt = '',
  priority = false,
  sizes = '100vw',
  className = '',
}: MediaProps) {
  const cms = normalizeCmsSource(src)

  // Payload CMS objects: serve pre-generated WebP sizes via native srcSet
  // so Sharp work happens at upload time.
  if (cms?.sizes && Object.keys(cms.sizes).length > 0) {
    const source = displaySource(cms)
    return (
      // eslint-disable-next-line @next/next/no-img-element -- CMS srcSet uses Payload WebP renditions
      <img
        src={source.url}
        srcSet={buildSrcSet(cms)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    )
  }

  if (cms) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cms.url}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    )
  }

  const nextSrc =
    typeof src === 'string'
      ? src
      : (src as StaticImageData)

  if (!nextSrc) return null

  return (
    <NextImage
      src={nextSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}
