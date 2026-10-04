/**
 * Regenerate Payload image size variants for existing media uploads.
 *
 * After changing `imageSizes` / WebP formatOptions on the Media collection,
 * run this once so existing uploads get avatar / thumbnail / card / medium /
 * large / xlarge / xxlarge WebP derivatives. Config changes only affect new
 * uploads unless you regenerate.
 *
 * Usage:
 *   npm run regenerate:media
 *   npm run regenerate:media -- --dry-run
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(__dirname, '../../.env.local') })

const dryRun = process.argv.includes('--dry-run')

async function regenerateMediaSizes() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  let page = 1
  let hasNextPage = true
  let processed = 0
  let skipped = 0
  let failed = 0

  while (hasNextPage) {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 25,
      page,
    })

    for (const doc of result.docs) {
      if (!doc.url || !doc.filename || !doc.mimeType) {
        payload.logger.warn(
          `Skipping media ${doc.id} (missing url/filename/mimeType)`,
        )
        skipped += 1
        continue
      }

      if (!doc.mimeType.startsWith('image/')) {
        skipped += 1
        continue
      }

      if (doc.mimeType === 'image/svg+xml' || doc.mimeType === 'image/gif') {
        payload.logger.info(`Skipping ${doc.filename} (${doc.mimeType})`)
        skipped += 1
        continue
      }

      try {
        const base =
          process.env.PAYLOAD_PUBLIC_SERVER_URL ||
          process.env.NEXT_PUBLIC_SERVER_URL ||
          'http://127.0.0.1:3000'
        const absoluteUrl = doc.url.startsWith('http')
          ? doc.url
          : new URL(doc.url, base).toString()
        const response = await fetch(absoluteUrl)
        if (!response.ok) {
          throw new Error(
            `Fetch failed: ${response.status} ${response.statusText} (${absoluteUrl})`,
          )
        }

        const buffer = Buffer.from(await response.arrayBuffer())
        payload.logger.info(
          `[${dryRun ? 'dry-run' : 'live'}] ${doc.filename} (${buffer.length} bytes) id=${doc.id}`,
        )

        if (dryRun) {
          processed += 1
          continue
        }

        await payload.update({
          collection: 'media',
          id: doc.id,
          data: {},
          file: {
            data: buffer,
            mimetype: doc.mimeType,
            name: doc.filename,
            size: buffer.length,
          },
          overwriteExistingFiles: true,
        })

        processed += 1
      } catch (error) {
        failed += 1
        payload.logger.error(
          `Failed regenerating ${doc.filename} (${doc.id}): ${error instanceof Error ? error.message : error}`,
        )
      }
    }

    hasNextPage = result.hasNextPage
    page += 1
  }

  payload.logger.info(
    `Done. processed=${processed} skipped=${skipped} failed=${failed}`,
  )
  process.exit(failed > 0 ? 1 : 0)
}

regenerateMediaSizes().catch((error) => {
  console.error(error)
  process.exit(1)
})
