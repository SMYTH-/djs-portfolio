import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PageHero } from './PageHero'

const meta = {
  title: 'Components/PageHero',
  component: PageHero,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    headline:
      'Connecting people through design and technology to create experiences that matter.',
    metaName: 'Dom Smyth',
    metaRole: 'Product Engineer • Designer • Builder',
  },
}
