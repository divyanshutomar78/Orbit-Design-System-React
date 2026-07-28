import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ActionMenuItemComponent } from 'orbit-ds-components';

const meta: Meta<ActionMenuItemComponent> = {
  title: 'Components/Action Menu Item',
  component: ActionMenuItemComponent,
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
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `
          <div style="width: 274px; background: var(--background-surface-container-2); border-radius: 8px;">
            <ul style="margin: 0; padding: 0; list-style: none;">${story.template}</ul>
          </div>
        `,
      };
    },
    moduleMetadata({ imports: [ActionMenuItemComponent] }),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <li
        orbitActionMenuItem
        [label]="label"
        [selected]="selected"
        [showLeftIcon]="showLeftIcon"
        [leftIconType]="leftIconType"
        [showRightIcon1]="showRightIcon1"
        [showRightIcon2]="showRightIcon2"
        [iconSize]="iconSize"
      ></li>
    `,
  }),
};

export default meta;

type Story = StoryObj<ActionMenuItemComponent>;

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
  render: () => ({
    template: `
      <li orbitActionMenuItem label="Next 12 hours"></li>
      <li orbitActionMenuItem label="This week" [selected]="true"></li>
      <li orbitActionMenuItem label="Next 30 days" [showRightIcon1]="false"></li>
    `,
  }),
};
