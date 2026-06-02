import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenuItem } from '@orbit/components';

const meta: Meta<typeof ActionMenuItem> = {
  title: 'Components/Action Menu Item',
  component: ActionMenuItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Figma - Text' },
    selected: { control: 'boolean', description: 'Figma State' },
    showLeftIcon: { control: 'boolean', description: 'Figma Show Left Icon' },
    leftIconType: {
      control: 'select',
      options: ['checkmark', 'checkbox', 'radio', 'toggle'],
      description: 'Figma left icon Type',
    },
    showRightIcon1: { control: 'boolean', description: 'Figma Right icon 1' },
    showRightIcon2: { control: 'boolean', description: 'Figma Right icon 2' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    leftIcon: { control: false },
    rightIcon1: { control: false },
    rightIcon2: { control: false },
    onSelect: { control: false },
    onRightIcon1Click: { control: false },
    onRightIcon2Click: { control: false },
    as: { control: false },
  },
  args: {
    label: 'Next 12 hours',
    selected: false,
    showLeftIcon: true,
    leftIconType: 'checkmark',
    showRightIcon1: true,
    showRightIcon2: true,
    iconSize: 'big',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 274,
          background: 'var(--background-surface-container-2)',
          borderRadius: 8,
        }}
      >
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

type Story = StoryObj<typeof ActionMenuItem>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    label: 'This week',
    selected: true,
  },
};

export const CloseOnly: Story = {
  args: {
    label: 'Next 30 days',
    showRightIcon1: false,
    showRightIcon2: true,
  },
};

export const Checkbox: Story = {
  args: {
    leftIconType: 'checkbox',
    selected: true,
  },
};

export const Radio: Story = {
  args: {
    leftIconType: 'radio',
    selected: true,
  },
};

export const Toggle: Story = {
  args: {
    leftIconType: 'toggle',
    selected: true,
  },
};

export const NoLeftIcon: Story = {
  args: {
    showLeftIcon: false,
  },
};

/** Figma Action Menu Item w select property matrix. */
export const FigmaMatrix: Story = {
  render: () => (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      <ActionMenuItem label="Next 12 hours" />
      <ActionMenuItem label="This week" selected />
      <ActionMenuItem label="Next 30 days" showRightIcon1={false} />
    </ul>
  ),
};
