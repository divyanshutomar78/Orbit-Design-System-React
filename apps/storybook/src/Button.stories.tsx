import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@orbit/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Figma Button Type',
    },
    minWidth: { control: 'boolean' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    minWidth: true,
    iconSize: 'big',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Mirrors the Figma variant matrix (type × interactive states). */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: 12,
        padding: 24,
      }}
    >
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <Button key={`${variant}-default`} variant={variant}>
          Button
        </Button>
      ))}
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <Button key={`${variant}-disabled`} variant={variant} disabled>
          Button
        </Button>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};
