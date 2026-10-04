import Image, { type ImageProps } from 'next/image'

export interface MediaFrameProps {
  src: ImageProps['src']
  alt: string
  aspect?: `${number}/${number}` | number
  priority?: boolean
  sizes?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

export function MediaFrame({
  src,
  alt,
  aspect = '2/1',
  priority = false,
  sizes = '(min-width: 90rem) 83rem, (min-width: 78.75rem) 72.75rem, 100vw',
  className = '',
  fill = true,
  width,
  height,
}: MediaFrameProps) {
  const aspectStyle =
    typeof aspect === 'number'
      ? { aspectRatio: String(aspect) }
      : { aspectRatio: aspect }

  return (
    <div
      className={['relative w-full overflow-hidden bg-foreground/5', className]
        .filter(Boolean)
        .join(' ')}
      style={aspectStyle}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
