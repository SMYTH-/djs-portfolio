import { config as loadEnv } from 'dotenv'

loadEnv({ path: '.env.local' })

async function seed() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('./payload.config')
  const payload = await getPayload({ config })

  const pages = [
    {
      title: 'Home',
      slug: 'home' as const,
      heroHeadline:
        'Connecting people through design and technology to create experiences that matter.',
      heroMetaName: 'Dom Smyth',
      heroMetaRole: 'Product Engineer • Designer • Builder',
    },
    {
      title: 'Work',
      slug: 'work' as const,
      heroHeadline: 'Selected work across product, systems, and craft.',
    },
    {
      title: 'About',
      slug: 'about' as const,
      heroHeadline:
        'Building products that connect people through design and technology.',
      heroMetaName: 'Dom Smyth',
      heroMetaRole: 'Product Engineer • Designer • Builder',
    },
    {
      title: 'Contact',
      slug: 'contact' as const,
      heroHeadline: 'Reach out for collaborations, roles, or just to say hello.',
    },
  ]

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: page,
      })
    } else {
      await payload.create({
        collection: 'pages',
        data: page,
      })
    }
  }

  const projectSeeds = [
    {
      title: 'Project One',
      slug: 'project-one',
      summary: 'A placeholder case study for the portfolio.',
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      title: 'Project Two',
      slug: 'project-two',
      summary: 'Another placeholder managed in Payload.',
      featured: true,
      publishedAt: new Date().toISOString(),
    },
  ]

  for (const project of projectSeeds) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    })

    if (!existing.docs[0]) {
      await payload.create({
        collection: 'projects',
        data: project,
      })
    }
  }

  console.log('Seed complete')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
