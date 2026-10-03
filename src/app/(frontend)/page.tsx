import { PageHero, ProjectCard, SectionBlock } from '@/components'
import { getPageBySlug, getProjects, mediaUrl } from '@/lib/payload'
import { Container, MediaFrame, Text } from '@/primitives'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [page, projects] = await Promise.all([
    getPageBySlug('home'),
    getProjects({ featured: true }),
  ])

  const headline =
    page?.heroHeadline ??
    'Connecting people through design and technology to create experiences that matter.'
  const heroSrc = mediaUrl(page?.heroMedia) ?? '/media/placeholder.svg'
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
    <Container className="flex flex-col gap-20">
      <PageHero
        headline={headline}
        metaName={page?.heroMetaName ?? 'Dom Smyth'}
        metaRole={
          page?.heroMetaRole ?? 'Product Engineer • Designer • Builder'
        }
      />

      <MediaFrame src={heroSrc} alt="Hero" priority />

      <SectionBlock
        label="Approach"
        title="Scalable and built to last"
      >
        <Text variant="body" className="max-w-3xl text-foreground/80">
          Work at the intersection of product design, systems, and engineering —
          turning complexity into structures people can understand, use, and
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
              imageSrc={mediaUrl(project.cover)}
            />
          ))}
        </div>
      </SectionBlock>
    </Container>
  )
}
