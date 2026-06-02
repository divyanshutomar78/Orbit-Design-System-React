import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ActionMenu } from '@orbit/components';

const figmaItems = [
  {
    id: '12h',
    label: 'Next 12 hours',
    selected: false,
    showLeftIcon: true,
    showRightIcon1: true,
    showRightIcon2: true,
  },
  {
    id: '24h',
    label: 'Next 24 hours',
    selected: false,
    showLeftIcon: true,
    showRightIcon1: true,
    showRightIcon2: true,
  },
  {
    id: 'week',
    label: 'This week',
    selected: true,
    showLeftIcon: true,
    showRightIcon1: true,
    showRightIcon2: true,
  },
  {
    id: '7d',
    label: 'Next seven days',
    selected: false,
    showLeftIcon: true,
    showRightIcon1: true,
    showRightIcon2: true,
  },
  {
    id: '30d',
    label: 'Next 30 days',
    selected: false,
    showLeftIcon: true,
    showRightIcon1: false,
    showRightIcon2: true,
  },
] as const;

const meta: Meta<typeof ActionMenu> = {
  title: 'Components/Action Menu',
  component: ActionMenu,
  tags: ['autodocs'],
  argTypes: {
    addItems: { control: 'boolean', description: 'Figma Add Items' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    items: { control: false },
    addMoreItem: { control: false },
    onItemSelect: { control: false },
    onItemRightIcon1: { control: false },
    onItemRightIcon2: { control: false },
  },
  args: {
    addItems: false,
    iconSize: 'big',
    items: [...figmaItems],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 274 }}>
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

type Story = StoryObj<typeof ActionMenu>;

export const Default: Story = {};

export const Interactive: Story = {
  render: function Render() {
    const [selectedId, setSelectedId] = useState('week');
    const [items, setItems] = useState(
      figmaItems.map((item) => ({ ...item, selected: item.id === selectedId })),
    );

    return (
      <ActionMenu
        items={items}
        onItemSelect={(id) => {
          setSelectedId(id);
          setItems((prev) =>
            prev.map((item) => ({ ...item, selected: item.id === id })),
          );
        }}
        onItemRightIcon2={(id) => {
          setItems((prev) => prev.filter((item) => item.id !== id));
        }}
      />
    );
  },
};

export const SmallIcons: Story = {
  args: {
    iconSize: 'small',
  },
};
