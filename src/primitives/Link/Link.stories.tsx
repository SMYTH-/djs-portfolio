import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Link } from './Link'

const meta = {
  title: 'Primitives/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '/',
    children: 'More Info ->',
  },
}
