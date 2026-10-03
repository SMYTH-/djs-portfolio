import { Container, Link, Text } from '@/primitives'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-12">
      <Container className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <Text variant="meta" as="p" className="font-medium">
            Dom Smyth
          </Text>
          <Text variant="meta" as="p" className="text-muted">
            Product Engineer • Designer • Builder
          </Text>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <Link href="mailto:hello@example.com" underline={false}>
            hello@example.com
          </Link>
          <Text variant="meta" as="p" className="text-muted">
            © {new Date().getFullYear()}
          </Text>
        </div>
      </Container>
    </footer>
  )
}
