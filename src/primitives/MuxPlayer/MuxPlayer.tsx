export interface MuxPlaybackProps {
  playbackId: string
  posterUrl?: string
  aspectRatio?: string
  maxWidth?: number
  maxHeight?: number
  title?: string
}

export interface MuxPlayerProps extends MuxPlaybackProps {
  fill?: boolean
  objectFit?: 'cover' | 'contain'
  className?: string
}

export function MuxPlayer({
  playbackId,
  posterUrl,
  title = '',
  className = '',
  objectFit = 'cover',
}: MuxPlayerProps) {
  const poster =
    posterUrl || `https://image.mux.com/${playbackId}/thumbnail.webp`

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Mux poster for SSR/tests; swap for @mux/mux-player-react when needed
    <img
      src={poster}
      alt={title}
      className={className}
      style={{ objectFit }}
    />
  )
}
