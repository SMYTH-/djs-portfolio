import type { Metadata } from 'next'

import { PageHero, ProjectCard, SectionBlock } from '@/components'
import { getPageBySlug, getProjects, mediaUrl } from '@/lib/payload'
import { Container, Text } from '@/primitives'

export const metadata: Metadata = {
  title: 'Work',
}

export const revalidate = 60

export default async function WorkPage() {
  const [page, projects] = await Promise.all([
    getPageBySlug('work'),
    getProjects(),
  ])

  const items = projects.length
    ? projects
    : [
        {
          id: 'placeholder-1',
          title: 'Project One',
          slug: 'project-one',
          summary: 'A placeholder case study for the portfolio routing shell.',
          cover: null,
        },
        {
          id: 'placeholder-2',
          title: 'Project Two',
          slug: 'project-two',
          summary: 'Another placeholder loaded until Payload content lands.',
          cover: null,
        },
      ]

  return (
    <Container className="flex flex-col gap-16">
      <PageHero
        headline={
          page?.heroHeadline ??
          'Selected work across product, systems, and craft.'
        }
        metaName={page?.heroMetaName}
        metaRole={page?.heroMetaRole}
      />

      <SectionBlock label="Work" title="Case studies and experiments">
        <Text variant="body" className="max-w-3xl text-foreground/80">
          This route content is code-split by the App Router and populated from
          Payload Projects.
        </Text>
        <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2">
          {items.map((project) => (
            <div key={String(project.id)} id={project.slug}>
              <ProjectCard
                title={project.title}
                href={`/work#${project.slug}`}
                summary={project.summary}
                imageSrc={mediaUrl(project.cover)}
              />
            </div>
          ))}
        </div>
      </SectionBlock>
    </Container>
  )
}
