import { SITE_EMAIL, SITE_EMAIL_HREF } from '@/lib/site'
import { Container, Link, Text } from '@/primitives'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-section-sm">
      <Container className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <Text variant="meta" as="p" className="font-medium">
            Dominic Smyth
          </Text>
          <Text variant="meta" as="p" className="text-muted">
            Web Engineer
          </Text>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <Link href={SITE_EMAIL_HREF} underline={false} className="text-body-sm">
            {SITE_EMAIL}
          </Link>
          <Text variant="meta" as="p" className="text-muted">
            © {new Date().getFullYear()}
          </Text>
        </div>
      </Container>
    </footer>
  )
}
