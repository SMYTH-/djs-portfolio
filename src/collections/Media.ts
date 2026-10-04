import type { CollectionConfig } from 'payload'

/** Small crops: photos. Larger sizes: UI screenshots need extra quality. */
function webp(quality: number) {
  return {
    format: 'webp' as const,
    options: { quality, smartSubsample: true },
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    // Width-only sizes preserve the original aspect ratio. Fixed width+height
    // crops break portrait sources when the browser picks them from srcSet.
    imageSizes: [
      { name: 'avatar', width: 160, formatOptions: webp(75) },
      { name: 'thumbnail', width: 400, formatOptions: webp(75) },
      { name: 'card', width: 800, formatOptions: webp(80) },
      { name: 'medium', width: 1200, formatOptions: webp(80) },
      { name: 'large', width: 1920, formatOptions: webp(85) },
      { name: 'xlarge', width: 2560, formatOptions: webp(85) },
      { name: 'xxlarge', width: 4000, formatOptions: webp(85) },
    ],
    resizeOptions: {
      width: 4000,
      withoutEnlargement: true,
    },
    adminThumbnail: 'thumbnail',
    modifyResponseHeaders: ({ headers }) => {
      headers.set(
        'Cache-Control',
        'public, max-age=31536000, stale-while-revalidate=86400',
      )
    },
  },
}
