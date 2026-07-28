import type { Meta, StoryObj } from '@storybook/angular';
import { OptionRadioComponent } from 'orbit-ds-components';

const meta: Meta<OptionRadioComponent> = {
  title: 'Components/Option Radio',
  component: OptionRadioComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean', description: 'Figma Selected' },
    status: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Figma Status',
    },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    selected: false,
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
      <orbit-option-radio
        [label]="label"
        [selected]="selected"
        [status]="status"
        [iconSize]="iconSize"
        [disabled]="disabled"
      ></orbit-option-radio>
    `,
  }),
};

export default meta;

type Story = StoryObj<OptionRadioComponent>;

export const Unselected: Story = {
  args: { selected: false, status: 'default' },
};

export const Selected: Story = {
  args: { selected: true, status: 'default' },
};

export const Hover: Story = {
  args: { selected: false, status: 'hover' },
};

export const Disabled: Story = {
  args: { selected: false, status: 'disabled', disabled: true },
};

export const SelectedDisabled: Story = {
  args: { selected: true, status: 'disabled', disabled: true },
};

/** Figma Option Radio (570:29315) — six variants. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; width: 165px;">
        <orbit-option-radio [selected]="false" status="default"></orbit-option-radio>
        <orbit-option-radio [selected]="false" status="hover"></orbit-option-radio>
        <orbit-option-radio [selected]="false" status="disabled" [disabled]="true"></orbit-option-radio>
        <orbit-option-radio [selected]="true" status="default"></orbit-option-radio>
        <orbit-option-radio [selected]="true" status="hover"></orbit-option-radio>
        <orbit-option-radio [selected]="true" status="disabled" [disabled]="true"></orbit-option-radio>
      </div>
    `,
  }),
};

export const RadioGroup: Story = {
  args: { value: 'b' },
  render: (args) => ({
    props: args,
    template: `
      <div role="radiogroup" aria-label="Options" style="display: flex; flex-direction: column; width: 165px;">
        <orbit-option-radio
          name="demo"
          value="a"
          label="Option A"
          [selected]="value === 'a'"
          (selectedChange)="value = 'a'"
        ></orbit-option-radio>
        <orbit-option-radio
          name="demo"
          value="b"
          label="Option B"
          [selected]="value === 'b'"
          (selectedChange)="value = 'b'"
        ></orbit-option-radio>
        <orbit-option-radio
          name="demo"
          value="c"
          label="Option C"
          [selected]="value === 'c'"
          (selectedChange)="value = 'c'"
        ></orbit-option-radio>
      </div>
    `,
  }),
};
