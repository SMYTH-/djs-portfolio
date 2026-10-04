/**
 * Force a Drizzle schema push so Media imageSizes columns exist, then exit.
 * Usage: PAYLOAD_FORCE_DRIZZLE_PUSH=true npx tsx src/scripts/push-schema.ts
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv({ path: path.resolve(__dirname, '../../.env.local') })

if (!process.env.NODE_ENV) {
  Object.assign(process.env, { NODE_ENV: 'development' })
}
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const sizes =
    payload.collections.media?.config?.upload?.imageSizes?.map(
      (s: { name: string }) => s.name,
    ) ?? []
  payload.logger.info(`Media imageSizes: ${sizes.join(', ') || '(none)'}`)

  const doc = await payload.find({ collection: 'media', limit: 1, depth: 0 })
  const first = doc.docs[0]
  payload.logger.info(
    `Sample media sizes keys: ${first?.sizes ? Object.keys(first.sizes).join(', ') : '(none)'}`,
  )
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
