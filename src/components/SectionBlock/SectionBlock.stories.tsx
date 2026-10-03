import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from '@/primitives'

import { SectionBlock } from './SectionBlock'

const meta = {
  title: 'Components/SectionBlock',
  component: SectionBlock,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Approach',
    title: 'Scalable and built to last',
    children: (
      <Text variant="body">
        Turning complexity into structures that people can understand, use, and
        evolve.
      </Text>
    ),
  },
}
