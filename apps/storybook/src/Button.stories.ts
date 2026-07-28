import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from 'orbit-ds-components';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
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
      <orbit-button
        [variant]="variant"
        [minWidth]="minWidth"
        [iconSize]="iconSize"
        [disabled]="disabled"
        [label]="label"
      ></orbit-button>
    `,
  }),
};

export default meta;

type Story = StoryObj<ButtonComponent>;

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
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 12px; padding: 24px;">
        <orbit-button variant="primary" label="Button"></orbit-button>
        <orbit-button variant="secondary" label="Button"></orbit-button>
        <orbit-button variant="tertiary" label="Button"></orbit-button>
        <orbit-button variant="primary" label="Button" [disabled]="true"></orbit-button>
        <orbit-button variant="secondary" label="Button" [disabled]="true"></orbit-button>
        <orbit-button variant="tertiary" label="Button" [disabled]="true"></orbit-button>
      </div>
    `,
  }),
  parameters: { layout: 'padded' },
};
