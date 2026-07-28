import type { Meta, StoryObj } from '@storybook/angular';
import { OptionCheckboxComponent } from 'orbit-ds-components';

const meta: Meta<OptionCheckboxComponent> = {
  title: 'Components/Option Checkbox',
  component: OptionCheckboxComponent,
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
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    state: 'off',
    status: 'default',
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
      <orbit-option-checkbox
        [label]="label"
        [state]="state"
        [status]="status"
        [iconSize]="iconSize"
        [disabled]="disabled"
      ></orbit-option-checkbox>
    `,
  }),
};

export default meta;

type Story = StoryObj<OptionCheckboxComponent>;

export const Off: Story = {
  args: { state: 'off', status: 'default' },
};

export const On: Story = {
  args: { state: 'on', status: 'default' },
};

export const Partial: Story = {
  args: { state: 'partial', status: 'default' },
};

export const Hover: Story = {
  args: { state: 'off', status: 'hover' },
};

export const Disabled: Story = {
  args: { state: 'off', status: 'disabled', disabled: true },
};

export const OnDisabled: Story = {
  args: { state: 'on', status: 'disabled', disabled: true },
};

/** Figma Option Checkbox (570:29495) — nine variants. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; width: 165px;">
        <orbit-option-checkbox state="off" status="default"></orbit-option-checkbox>
        <orbit-option-checkbox state="off" status="hover"></orbit-option-checkbox>
        <orbit-option-checkbox state="off" status="disabled" [disabled]="true"></orbit-option-checkbox>
        <orbit-option-checkbox state="on" status="default"></orbit-option-checkbox>
        <orbit-option-checkbox state="on" status="hover"></orbit-option-checkbox>
        <orbit-option-checkbox state="on" status="disabled" [disabled]="true"></orbit-option-checkbox>
        <orbit-option-checkbox state="partial" status="default"></orbit-option-checkbox>
        <orbit-option-checkbox state="partial" status="hover"></orbit-option-checkbox>
        <orbit-option-checkbox state="partial" status="disabled" [disabled]="true"></orbit-option-checkbox>
      </div>
    `,
  }),
};

export const CheckboxGroup: Story = {
  render: () => ({
    props: { a: false, b: true, c: false },
    template: `
      <div style="display: flex; flex-direction: column; width: 165px;">
        <orbit-option-checkbox
          label="Option A"
          [state]="a ? 'on' : 'off'"
          (checkedChange)="a = !a"
        ></orbit-option-checkbox>
        <orbit-option-checkbox
          label="Option B"
          [state]="b ? 'on' : 'off'"
          (checkedChange)="b = !b"
        ></orbit-option-checkbox>
        <orbit-option-checkbox
          label="Option C"
          [state]="c ? 'on' : 'off'"
          (checkedChange)="c = !c"
        ></orbit-option-checkbox>
      </div>
    `,
  }),
};
