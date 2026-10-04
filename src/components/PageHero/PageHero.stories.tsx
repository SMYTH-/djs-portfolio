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

export const Home: Story = {
  args: {
    eyebrow: 'WEB ENGINEER · LONDON',
    headline: (
      <>
        I build websites people
        <br />
        actually enjoy using.
      </>
    ),
    description:
      'React, Next.js and WordPress developer working with design-led teams and agencies.',
    cta: { href: '/work', label: 'View my work ↓' },
  },
}

export const Default: Story = {
  args: {
    headline: 'Selected work across product, systems, and craft.',
    metaName: 'Dominic Smyth',
    metaRole: 'Web Engineer',
  },
}
