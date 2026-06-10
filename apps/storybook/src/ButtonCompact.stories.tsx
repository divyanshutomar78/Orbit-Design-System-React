import type { Meta, StoryObj } from '@storybook/react';
import { ButtonCompact } from 'orbit-ds-components';

const meta: Meta<typeof ButtonCompact> = {
  title: 'Components/Button Compact',
  component: ButtonCompact,
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

type Story = StoryObj<typeof ButtonCompact>;

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

/** Mirrors the Figma Button Compact matrix (node 1970:74393). */
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
        <ButtonCompact key={`${variant}-default`} variant={variant}>
          Button
        </ButtonCompact>
      ))}
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <ButtonCompact key={`${variant}-disabled`} variant={variant} disabled>
          Button
        </ButtonCompact>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};
