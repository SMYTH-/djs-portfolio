import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Container } from './Container'
import { Text } from '../Text'

const meta = {
  title: 'Primitives/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <Text variant="body">
        Content sits in a stepped max-width column with page-margin gutters.
      </Text>
    ),
  },
}
