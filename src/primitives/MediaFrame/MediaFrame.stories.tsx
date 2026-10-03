import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MediaFrame } from './MediaFrame'

const meta = {
  title: 'Primitives/MediaFrame',
  component: MediaFrame,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: '/media/placeholder.svg',
    alt: 'Placeholder landscape',
    priority: true,
  },
}
