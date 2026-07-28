import type { Meta, StoryObj } from '@storybook/angular';
import { LabelValueVerticalComponent, labelValueVerticalLayouts } from 'orbit-ds-components';

const meta: Meta<LabelValueVerticalComponent> = {
  title: 'Components/Label Value Vertical',
  component: LabelValueVerticalComponent,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: labelValueVerticalLayouts,
      description: 'Figma Layout',
    },
    label: { control: 'text' },
    secondaryLabel: {
      control: 'text',
      description: 'Bottom label (`L + V + L`)',
    },
    value: { control: 'text' },
    big: { control: 'boolean', description: 'Figma Only Value — Big' },
  },
  args: {
    layout: 'L+V',
    label: 'Label',
    secondaryLabel: 'Label',
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
      <orbit-label-value-vertical
        [layout]="layout"
        [label]="label"
        [secondaryLabel]="secondaryLabel"
        [value]="value"
        [big]="big"
      ></orbit-label-value-vertical>
    `,
  }),
};

export default meta;

type Story = StoryObj<LabelValueVerticalComponent>;

export const LabelThenValue: Story = {
  args: { layout: 'L+V' },
};

export const ValueLabel: Story = {
  args: { layout: 'V + L' },
};

export const LabelValueLabel: Story = {
  args: { layout: 'L + V + L' },
};

export const BigValue: Story = {
  args: { layout: 'L+V', big: true },
};

/** Figma Label Value_Vertical (1832:34754). */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; padding: 20px;">
        <orbit-label-value-vertical layout="V + L"></orbit-label-value-vertical>
        <orbit-label-value-vertical layout="L+V"></orbit-label-value-vertical>
        <orbit-label-value-vertical layout="L + V + L"></orbit-label-value-vertical>
      </div>
    `,
  }),
};
