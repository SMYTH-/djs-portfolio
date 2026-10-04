export interface VideoProps {
  src: string
  title?: string
  aspect?: 'auto' | 'video' | 'square'
  rounded?: boolean
  priority?: boolean
  className?: string
}

function youtubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] || null
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] || null
      }
      if (parsed.pathname === '/oembed') {
        const nested = parsed.searchParams.get('url')
        return nested ? youtubeId(nested) : null
      }
      return parsed.searchParams.get('v')
    }
  } catch {
    return null
  }

  return null
}

function vimeoId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host !== 'vimeo.com' && host !== 'player.vimeo.com') return null
    const parts = parsed.pathname.split('/').filter(Boolean)
    return parts[parts.length - 1] || null
  } catch {
    return null
  }
}

export function Video({
  src,
  title = 'Video',
  priority = false,
  className = '',
}: VideoProps) {
  const yt = youtubeId(src)
  const vimeo = yt ? null : vimeoId(src)

  if (!yt && !vimeo) return null

  const embedSrc = yt
    ? `https://www.youtube-nocookie.com/embed/${yt}`
    : `https://player.vimeo.com/video/${vimeo}`

  return (
    <iframe
      src={embedSrc}
      title={title}
      loading={priority ? 'eager' : 'lazy'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={['border-0', className].filter(Boolean).join(' ')}
    />
  )
}
