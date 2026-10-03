import { Container, Text } from '@/primitives'

export default function Loading() {
  return (
    <Container>
      <Text variant="meta" className="text-muted">
        Loading…
      </Text>
    </Container>
  )
}
