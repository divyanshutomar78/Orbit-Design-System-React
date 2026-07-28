import type { Meta, StoryObj } from '@storybook/angular';
import { OptionToggleComponent } from 'orbit-ds-components';

const meta: Meta<OptionToggleComponent> = {
  title: 'Components/Option Toggle',
  component: OptionToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    state: {
      control: 'select',
      options: ['off', 'on', 'partial'],
      description: 'Figma State',
    },
    status: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Figma Status',
    },
    showRightIcon: { control: 'boolean', description: 'Figma showRightIcon' },
    checked: { control: 'boolean' },
    partial: { control: 'boolean' },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    state: 'off',
    status: 'default',
    showRightIcon: false,
    iconSize: 'big',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-option-toggle
        [label]="label"
        [state]="state"
        [status]="status"
        [showRightIcon]="showRightIcon"
        [iconSize]="iconSize"
        [disabled]="disabled"
      ></orbit-option-toggle>
    `,
  }),
};

export default meta;

type Story = StoryObj<OptionToggleComponent>;

export const Off: Story = {
  args: { state: 'off', status: 'default' },
};

export const On: Story = {
  args: { state: 'on', status: 'default' },
};

export const Partial: Story = {
  args: { state: 'partial', status: 'default' },
};

export const WithRightIcon: Story = {
  args: { state: 'on', showRightIcon: true },
};

export const Disabled: Story = {
  args: { state: 'off', status: 'disabled', disabled: true },
};

/** Figma Option Toggle (569:28473) — nine variants. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; width: 165px;">
        <orbit-option-toggle state="off" status="default"></orbit-option-toggle>
        <orbit-option-toggle state="off" status="hover"></orbit-option-toggle>
        <orbit-option-toggle state="off" status="disabled" [disabled]="true"></orbit-option-toggle>
        <orbit-option-toggle state="on" status="default"></orbit-option-toggle>
        <orbit-option-toggle state="on" status="hover"></orbit-option-toggle>
        <orbit-option-toggle state="on" status="disabled" [disabled]="true"></orbit-option-toggle>
        <orbit-option-toggle state="partial" status="default"></orbit-option-toggle>
        <orbit-option-toggle state="partial" status="hover"></orbit-option-toggle>
        <orbit-option-toggle state="partial" status="disabled" [disabled]="true"></orbit-option-toggle>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    props: { on: false },
    template: `
      <orbit-option-toggle
        label="Enable feature"
        [state]="on ? 'on' : 'off'"
        (checkedChange)="on = !on"
      ></orbit-option-toggle>
    `,
  }),
};
