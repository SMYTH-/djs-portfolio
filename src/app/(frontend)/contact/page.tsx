import type { Metadata } from 'next'

import { PageHero, SectionBlock } from '@/components'
import { getPageBySlug } from '@/lib/payload'
import { Container, Link, Text } from '@/primitives'

export const metadata: Metadata = {
  title: 'Contact',
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const page = await getPageBySlug('contact')

  return (
    <Container className="flex flex-col gap-16">
      <PageHero
        headline={
          page?.heroHeadline ??
          'Reach out for collaborations, roles, or just to say hello.'
        }
        metaName={page?.heroMetaName}
        metaRole={page?.heroMetaRole}
      />

      <SectionBlock label="Contact" title="Let’s connect">
        <Text variant="body" className="max-w-xl text-foreground/80">
          Email is the fastest path. Social links can live here once the CMS
          content is filled in.
        </Text>
        <div className="mt-2">
          <Link href="mailto:hello@example.com">hello@example.com</Link>
        </div>
      </SectionBlock>
    </Container>
  )
}
