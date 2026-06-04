import type { Meta, StoryObj } from '@storybook/react';
import {
  LabelValueVertical,
  labelValueVerticalLayouts,
} from '@orbit/components';

const meta: Meta<typeof LabelValueVertical> = {
  title: 'Components/Label Value Vertical',
  component: LabelValueVertical,
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
    labelSlot: { control: false },
    valueSlot: { control: false },
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
};

export default meta;

type Story = StoryObj<typeof LabelValueVertical>;

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
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: 20,
      }}
    >
      <LabelValueVertical layout="V + L" />
      <LabelValueVertical layout="L+V" />
      <LabelValueVertical layout="L + V + L" />
    </div>
  ),
};
