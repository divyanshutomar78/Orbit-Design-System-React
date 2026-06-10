import type { Meta, StoryObj } from '@storybook/react';
import { NeutralChip } from 'orbit-ds-components';

const meta: Meta<typeof NeutralChip> = {
  title: 'Components/Neutral Chip',
  component: NeutralChip,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['chip', 'tag'],
      description: 'Figma Type',
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Figma Size',
    },
    selected: { control: 'boolean' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    showIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Text',
    type: 'chip',
    size: 'default',
    selected: false,
    iconSize: 'small',
    showIcon: true,
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default meta;

type Story = StoryObj<typeof NeutralChip>;

export const ChipDefault: Story = {
  args: { type: 'chip', size: 'default' },
};

export const ChipSelected: Story = {
  args: { type: 'chip', size: 'default', selected: true },
};

export const TagDefault: Story = {
  args: { type: 'tag', size: 'default' },
};

export const TagSelected: Story = {
  args: { type: 'tag', size: 'default', selected: true },
};

export const CompactChip: Story = {
  args: { type: 'chip', size: 'compact' },
};

export const CompactTagSelected: Story = {
  args: { type: 'tag', size: 'compact', selected: true },
};

/** Mirrors Figma _Neutral Chip matrix (Type × Size × Selected). */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 16,
        padding: 24,
      }}
    >
      {(['chip', 'tag'] as const).map((type) =>
        (['default', 'compact'] as const).map((size) => (
          <div
            key={`${type}-${size}`}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            <NeutralChip type={type} size={size}>
              Text
            </NeutralChip>
            <NeutralChip type={type} size={size} selected>
              Text
            </NeutralChip>
          </div>
        )),
      )}
    </div>
  ),
  parameters: { layout: 'padded' },
};
