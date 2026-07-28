import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonCompactComponent } from 'orbit-ds-components';

const meta: Meta<ButtonCompactComponent> = {
  title: 'Components/Button Compact',
  component: ButtonCompactComponent,
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
    label: 'Button',
    variant: 'primary',
    minWidth: true,
    iconSize: 'big',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-button-compact
        [variant]="variant"
        [minWidth]="minWidth"
        [iconSize]="iconSize"
        [disabled]="disabled"
        [label]="label"
      ></orbit-button-compact>
    `,
  }),
};

export default meta;

type Story = StoryObj<ButtonCompactComponent>;

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
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 12px; padding: 24px;">
        <orbit-button-compact variant="primary" label="Button"></orbit-button-compact>
        <orbit-button-compact variant="secondary" label="Button"></orbit-button-compact>
        <orbit-button-compact variant="tertiary" label="Button"></orbit-button-compact>
        <orbit-button-compact variant="primary" label="Button" [disabled]="true"></orbit-button-compact>
        <orbit-button-compact variant="secondary" label="Button" [disabled]="true"></orbit-button-compact>
        <orbit-button-compact variant="tertiary" label="Button" [disabled]="true"></orbit-button-compact>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
};
