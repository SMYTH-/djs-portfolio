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
      options: [
        'hero',
        'sectionTitle',
        'eyebrow',
        'label',
        'body',
        'meta',
        'link',
      ],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Hero: Story = {
  args: {
    variant: 'hero',
    children: (
      <>
        I build websites people
        <br />
        actually enjoy using.
      </>
    ),
  },
}

export const SectionTitle: Story = {
  args: {
    variant: 'sectionTitle',
    children: 'Scalable and built to last',
  },
}

export const Eyebrow: Story = {
  args: {
    variant: 'eyebrow',
    children: 'WEB ENGINEER · LONDON',
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
      'React, Next.js and WordPress developer working with design-led teams and agencies.',
  },
}

export const MetaLine: Story = {
  args: {
    variant: 'meta',
    children: 'Dominic Smyth',
  },
}
