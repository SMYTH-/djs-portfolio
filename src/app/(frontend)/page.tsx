import { MediaBlock, PageHero, ProjectCard, SectionBlock } from '@/components'
import { getPageBySlug, getProjects, mediaSrc, mediaUrl } from '@/lib/payload'
import { Container, Text } from '@/primitives'

export const revalidate = 60

export default async function HomePage() {
  const [page, projects] = await Promise.all([
    getPageBySlug('home'),
    getProjects({ featured: true }),
  ])

  const heroSrc =
    mediaSrc(page?.heroMedia) ??
    mediaUrl(page?.heroMedia) ??
    '/media/hero-temagami.jpg'
  const featured = projects.length
    ? projects
    : [
        {
          id: 'placeholder-1',
          title: 'Project One',
          slug: 'project-one',
          summary: 'A placeholder case study for the portfolio.',
          cover: null,
        },
        {
          id: 'placeholder-2',
          title: 'Project Two',
          slug: 'project-two',
          summary: 'Another placeholder that will come from Payload.',
          cover: null,
        },
      ]

  return (
    <Container className="flex flex-col gap-section-md">
      <PageHero
        eyebrow="WEB ENGINEER · LONDON"
        headline={
          <>
            I build websites people
            <br />
            actually enjoy using.
          </>
        }
        description="React, Next.js and WordPress developer working with design-led teams and agencies."
        cta={{ href: '/work', label: 'View my work ↓' }}
      />

      <MediaBlock
        media={{
          src: heroSrc,
          alt: 'Dominic Smyth in Temagami, standing in snow at dusk',
        }}
        aspect="video"
        priority
        spacing="none"
        background="none"
        width="full"
      />

      <SectionBlock
        label="Approach"
        title="Scalable and built to last"
      >
        <Text variant="body" className="max-w-3xl text-foreground/80">
          Work at the intersection of web engineering, systems, and craft —
          turning complexity into interfaces people can understand, use, and
          evolve.
        </Text>
      </SectionBlock>

      <SectionBlock label="Selected work" title="Projects that ship.">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={String(project.id)}
              title={project.title}
              href={`/work#${project.slug}`}
              summary={project.summary}
              imageSrc={mediaSrc(project.cover) ?? mediaUrl(project.cover)}
            />
          ))}
        </div>
      </SectionBlock>
    </Container>
  )
}
