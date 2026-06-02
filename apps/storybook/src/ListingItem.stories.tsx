import type { Meta, StoryObj } from '@storybook/react';
import { ListingItem } from '@orbit/components';

const meta: Meta<typeof ListingItem> = {
  title: 'Components/Listing Item',
  component: ListingItem,
  tags: ['autodocs'],
  argTypes: {
    multiLine: { control: 'boolean', description: 'Figma Multi-line' },
    reorderIcon: { control: 'boolean', description: 'Figma GF icon reorder' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    showLeftIcon: { control: 'boolean', description: 'Figma Show left icon' },
    showRightIcon: { control: 'boolean', description: 'Figma Show right icon' },
    showTitle: {
      control: 'boolean',
      description: 'Figma Show Title (single-line)',
    },
    showLabelValue: { control: 'boolean', description: 'Figma Show Label+Value' },
    showHelper: { control: 'boolean', description: 'Figma Show Helper (multi-line)' },
    title: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    helper: { control: 'text' },
    leftIcon: { control: false },
    rightIcon: { control: false },
    addIconsComponent: { control: false },
    labelValue: { control: false },
  },
  args: {
    multiLine: false,
    reorderIcon: true,
    iconSize: 'big',
    showLeftIcon: true,
    showRightIcon: true,
    showTitle: false,
    showLabelValue: true,
    showHelper: false,
    title: 'Title',
    label: 'Label',
    value: 'Value',
    helper: 'Helper',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 298 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof ListingItem>;

export const SingleLine: Story = {
  args: {
    multiLine: false,
    showTitle: false,
  },
};

export const SingleLineWithTitle: Story = {
  args: {
    multiLine: false,
    showTitle: true,
  },
};

export const MultiLine: Story = {
  args: {
    multiLine: true,
    showHelper: false,
  },
};

export const MultiLineWithHelper: Story = {
  args: {
    multiLine: true,
    showHelper: true,
  },
};

export const Minimal: Story = {
  args: {
    reorderIcon: false,
    showLeftIcon: false,
    showRightIcon: false,
    showLabelValue: true,
  },
};

export const Interactive: Story = {
  args: {
    onClick: () => undefined,
  },
};

/** Matches Figma Listing item frame (908:1711) — single-line + multi-line rows. */
export const FigmaMatrix: Story = {
  render: () => (
    <div
      style={{
        width: 298,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <ListingItem />
      <ListingItem multiLine showHelper />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two rows from Figma: Multi-line=False and Multi-line=True.',
      },
    },
  },
};

export const Playground: Story = {};
