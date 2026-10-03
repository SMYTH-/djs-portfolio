import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from './Text'

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['hero', 'sectionTitle', 'label', 'body', 'meta', 'link'],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Hero: Story = {
  args: {
    variant: 'hero',
    children:
      'Connecting people through design and technology to create experiences that matter.',
  },
}

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Approach',
  },
}

export const Body: Story = {
  args: {
    variant: 'body',
    children:
      'My work sits at the intersection of digital product design and design systems.',
  },
}
