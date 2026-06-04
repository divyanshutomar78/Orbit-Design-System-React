import type { Meta, StoryObj } from '@storybook/react';
import { EWasNavItem } from '@orbit/components';

const meta: Meta<typeof EWasNavItem> = {
  title: 'Components/eWAS Nav Item',
  component: EWasNavItem,
  tags: ['autodocs'],
  argTypes: {
    navItem: { control: 'text', description: 'Figma Nav Item' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'splitView', 'vertical'],
      description: 'Figma Orientation',
    },
    state: {
      control: 'select',
      options: ['default', 'active', 'disabled'],
      description: 'Figma State',
    },
    iconSize: { control: 'select', options: ['small', 'big'] },
    icon: { control: false },
    disabled: { control: false },
  },
  args: {
    navItem: 'Flights',
    orientation: 'horizontal',
    state: 'default',
    iconSize: 'big',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof EWasNavItem>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    state: 'active',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
};

export const SplitView: Story = {
  args: {
    orientation: 'splitView',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

/** Figma eWAS Nav Item frame (4486:143873) — 3×3 variant matrix. */
export const FigmaMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: 20,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <EWasNavItem orientation="horizontal" state="default" />
      <EWasNavItem orientation="horizontal" state="active" />
      <EWasNavItem orientation="horizontal" state="disabled" />

      <EWasNavItem orientation="splitView" state="default" />
      <EWasNavItem orientation="splitView" state="active" />
      <EWasNavItem orientation="splitView" state="disabled" />

      <EWasNavItem orientation="vertical" state="default" />
      <EWasNavItem orientation="vertical" state="active" />
      <EWasNavItem orientation="vertical" state="disabled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Rows: Horizontal, Split View, Vertical. Columns: Default, Active, Disabled.',
      },
    },
  },
};
