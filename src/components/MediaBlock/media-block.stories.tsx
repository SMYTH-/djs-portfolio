import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MediaBlock } from './media-block'

const meta = {
  title: 'Components/MediaBlock',
  component: MediaBlock,
  parameters: { layout: 'padded' },
  args: {
    media: { src: '/media/placeholder.svg', alt: 'Placeholder landscape' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mux: Story = {
  args: {
    mux: { playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe' },
    media: undefined,
  },
}

export const YouTube: Story = {
  args: {
    embed: {
      url: 'https://www.youtube.com/watch?v=19g66ezsKAg',
      title: 'Showreel',
    },
    media: undefined,
  },
}

export const Square: Story = {
  args: { aspect: 'square' },
}
