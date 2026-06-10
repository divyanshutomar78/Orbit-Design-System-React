import type { Meta, StoryObj } from '@storybook/react';
import {
  LabelValueHorizontal,
  labelValueHorizontalLayouts,
} from 'orbit-ds-components';

const meta: Meta<typeof LabelValueHorizontal> = {
  title: 'Components/Label Value Horizontal',
  component: LabelValueHorizontal,
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
    labelSlot: { control: false },
    valueSlot: { control: false },
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
};

export default meta;

type Story = StoryObj<typeof LabelValueHorizontal>;

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
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 20,
      }}
    >
      <LabelValueHorizontal layout="L + V" />
      <LabelValueHorizontal layout="V + L" />
      <LabelValueHorizontal layout="L+V+L" />
      <LabelValueHorizontal layout="V" />
      <LabelValueHorizontal layout="L" />
    </div>
  ),
};
