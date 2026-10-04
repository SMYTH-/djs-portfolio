import type { CSSProperties } from 'react'

import { Media, type MediaSrc } from '@/primitives/Media'
import {
  MuxPlayer,
  type MuxPlaybackProps,
} from '@/primitives/MuxPlayer'
import { Section, type SectionBandProps } from '@/primitives/Section'
import { Video } from '@/primitives/Video'

/** Frame proportions. `"auto"` uses the media's own intrinsic ratio. */
export type MediaBlockAspect = 'video' | 'square' | 'auto'

export interface MediaBlockProps extends SectionBandProps {
  /**
   * Mux video for the frame — a silent, looping ambient clip. Takes
   * precedence over `media` when both are supplied.
   */
  mux?: MuxPlaybackProps
  /**
   * YouTube or Vimeo video for the frame, as the URL the editor pasted.
   * Ranks below `mux` and above `media`.
   */
  embed?: { url: string; title?: string }
  /**
   * Image or self-hosted video for the frame, rendered through the Media
   * primitive. Used when the CMS has no Mux asset.
   */
  media?: { src: MediaSrc; alt?: string }
  /**
   * Frame proportions. Defaults to `"video"` (16:9).
   * `"auto"` takes the media's own shape, falling back to 16:9.
   */
  aspect?: MediaBlockAspect
  /** Set when the block sits above the fold. */
  priority?: boolean
  /** Colour scheme for the band. Forwarded to the Section wrapper. */
  theme?: 'light' | 'dark'
  className?: string
}

const coverFillClass = 'absolute inset-0 size-full object-cover object-center'

/** CSS `aspect-ratio` from a CMS media object's intrinsic dimensions. */
function mediaAspectRatio(src: MediaSrc): string | undefined {
  if (typeof src !== 'object' || src == null || !('width' in src) || !src.width || !src.height) {
    return undefined
  }
  return `${src.width} / ${src.height}`
}

/** CSS `aspect-ratio` for a Mux clip from its `"W:H"` ratio or max dimensions. */
function muxAspectRatio(mux: MuxPlaybackProps): string | undefined {
  if (mux.aspectRatio) {
    const [w, h] = mux.aspectRatio.split(':')
    if (w?.trim() && h?.trim()) return `${w.trim()} / ${h.trim()}`
  }
  if (mux.maxWidth && mux.maxHeight) return `${mux.maxWidth} / ${mux.maxHeight}`
  return undefined
}

/** Resolves the frame's CSS `aspect-ratio` from the `aspect` prop and the media. */
function resolveAspectRatio(
  aspect: MediaBlockAspect,
  mux?: MuxPlaybackProps,
  src?: MediaSrc,
): string {
  if (aspect === 'square') return '1 / 1'
  if (aspect === 'video') return '16 / 9'
  const derived = mux ? muxAspectRatio(mux) : src ? mediaAspectRatio(src) : undefined
  return derived ?? '16 / 9'
}

/**
 * Media block: a single piece of media — a Mux clip, a YouTube/Vimeo embed, or
 * an image through the Media primitive — in a content-width frame.
 *
 * Precedence: `mux` → `embed` → `media`.
 */
export function MediaBlock({
  mux,
  embed,
  media,
  aspect = 'video',
  priority = false,
  theme,
  spacing,
  innerSpacing,
  background,
  bleed,
  width,
  className,
}: MediaBlockProps) {
  if (!mux && !embed?.url && !media?.src) return null

  const aspectRatio = resolveAspectRatio(
    aspect,
    mux,
    embed?.url ? undefined : media?.src,
  )

  return (
    <Section
      theme={theme}
      spacing={spacing ?? { bottom: 'lg' }}
      innerSpacing={innerSpacing}
      background={background}
      bleed={bleed}
      width={width}
      layout="none"
      className={className}
    >
      <div
        className="relative w-full overflow-hidden bg-foreground/5 max-lg:[[data-mobile-bleed]_&]:rounded-none"
        style={{ aspectRatio } as CSSProperties}
      >
        {mux ? (
          <MuxPlayer
            {...mux}
            title={media?.alt ?? ''}
            fill
            objectFit="cover"
            className="size-full"
          />
        ) : embed?.url ? (
          <Video
            src={embed.url}
            title={embed.title ?? 'Video'}
            aspect="auto"
            rounded={false}
            priority={priority}
            className="absolute inset-0 size-full"
          />
        ) : media ? (
          <Media
            src={media.src}
            alt={media.alt ?? ''}
            priority={priority}
            sizes="(min-width: 90rem) 83rem, (min-width: 78.75rem) 72.75rem, 100vw"
            className={coverFillClass}
          />
        ) : null}
      </div>
    </Section>
  )
}
