import type { Meta, StoryObj } from '@storybook/angular';
import { LabelValueHorizontalComponent, labelValueHorizontalLayouts } from 'orbit-ds-components';

const meta: Meta<LabelValueHorizontalComponent> = {
  title: 'Components/Label Value Horizontal',
  component: LabelValueHorizontalComponent,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: labelValueHorizontalLayouts,
      description: 'Figma Type',
    },
    label: { control: 'text' },
    secondaryLabel: {
      control: 'text',
      description: 'Second label (`L+V+L`, Figma label2)',
    },
    value: { control: 'text' },
    big: { control: 'boolean', description: 'Figma Only Value — Big' },
  },
  args: {
    layout: 'L + V',
    label: 'Label',
    secondaryLabel: 'Label2',
    value: 'Value',
    big: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-label-value-horizontal
        [layout]="layout"
        [label]="label"
        [secondaryLabel]="secondaryLabel"
        [value]="value"
        [big]="big"
      ></orbit-label-value-horizontal>
    `,
  }),
};

export default meta;

type Story = StoryObj<LabelValueHorizontalComponent>;

export const LabelThenValue: Story = {
  args: { layout: 'L + V' },
};

export const ValueThenLabel: Story = {
  args: { layout: 'V + L' },
};

export const LabelValueLabel: Story = {
  args: { layout: 'L+V+L' },
};

export const ValueOnly: Story = {
  args: { layout: 'V' },
};

export const LabelOnly: Story = {
  args: { layout: 'L' },
};

export const BigValue: Story = {
  args: { layout: 'L + V', big: true },
};

/** Figma Label Value_Horizontal (94:156). */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px;">
        <orbit-label-value-horizontal layout="L + V"></orbit-label-value-horizontal>
        <orbit-label-value-horizontal layout="V + L"></orbit-label-value-horizontal>
        <orbit-label-value-horizontal layout="L+V+L"></orbit-label-value-horizontal>
        <orbit-label-value-horizontal layout="V"></orbit-label-value-horizontal>
        <orbit-label-value-horizontal layout="L"></orbit-label-value-horizontal>
      </div>
    `,
  }),
};
