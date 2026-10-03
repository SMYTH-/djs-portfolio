import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProjectCard } from './ProjectCard'

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Project One',
    href: '/work',
    summary: 'A placeholder case study card.',
    imageSrc: '/media/placeholder.svg',
  },
}
