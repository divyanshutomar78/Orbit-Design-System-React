import type { Meta, StoryObj } from '@storybook/angular';
import { ActionMenuComponent, type ActionMenuItemConfig } from 'orbit-ds-components';

const figmaItems: ActionMenuItemConfig[] = [
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
];

const meta: Meta<ActionMenuComponent> = {
  title: 'Components/Action Menu',
  component: ActionMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    addItems: { control: 'boolean', description: 'Figma Add Items' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    items: { control: false },
  },
  args: {
    addItems: false,
    iconSize: 'big',
    items: [...figmaItems],
  },
  decorators: [
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div style="width: 274px;">${story.template}</div>`,
      };
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-action-menu [addItems]="addItems" [items]="items" [iconSize]="iconSize"></orbit-action-menu>
    `,
  }),
};

export default meta;

type Story = StoryObj<ActionMenuComponent>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => ({
    props: {
      items: figmaItems.map((item) => ({ ...item })),
      onItemSelect(id: string) {
        this['items'] = this['items'].map((item: ActionMenuItemConfig) => ({
          ...item,
          selected: item.id === id,
        }));
      },
      onItemRightIcon2(id: string) {
        this['items'] = this['items'].filter((item: ActionMenuItemConfig) => item.id !== id);
      },
    },
    template: `
      <orbit-action-menu
        [items]="items"
        (itemSelect)="onItemSelect($event)"
        (itemRightIcon2)="onItemRightIcon2($event)"
      ></orbit-action-menu>
    `,
  }),
};

export const SmallIcons: Story = {
  args: {
    iconSize: 'small',
  },
};
