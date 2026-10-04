import type { Metadata } from 'next'

import { PageHero, SectionBlock } from '@/components'
import { getPageBySlug } from '@/lib/payload'
import { Container, Text } from '@/primitives'

export const metadata: Metadata = {
  title: 'About',
}

export const revalidate = 60

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  return (
    <Container className="flex flex-col gap-section-md">
      <PageHero
        headline={
          page?.heroHeadline ??
          'Building products that connect people through design and technology.'
        }
        metaName={page?.heroMetaName ?? 'Dominic Smyth'}
        metaRole={
          page?.heroMetaRole ?? 'Web Engineer'
        }
      />

      <SectionBlock label="About" title="How the work comes together">
        <Text variant="body" className="max-w-3xl text-foreground/80">
          The layout and nav stay mounted while App Router swaps this page
          segment on the client. Content here is managed in Payload Pages.
        </Text>
      </SectionBlock>
    </Container>
  )
}
