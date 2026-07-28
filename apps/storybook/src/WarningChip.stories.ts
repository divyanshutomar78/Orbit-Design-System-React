import type { Meta, StoryObj } from '@storybook/angular';
import { WarningChipComponent } from 'orbit-ds-components';

const meta: Meta<WarningChipComponent> = {
  title: 'Components/Warning Chip',
  component: WarningChipComponent,
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
    label: 'Text',
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
  render: (args) => ({
    props: args,
    template: `
      <orbit-warning-chip
        [type]="type"
        [size]="size"
        [selected]="selected"
        [iconSize]="iconSize"
        [showIcon]="showIcon"
        [disabled]="disabled"
        [label]="label"
      ></orbit-warning-chip>
    `,
  }),
};

export default meta;

type Story = StoryObj<WarningChipComponent>;

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

/** Mirrors Figma _Warning Chip matrix (4917:93843). Use Theme n-grey for red tones. */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 16px; padding: 24px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-warning-chip type="chip" size="default" label="Text"></orbit-warning-chip>
          <orbit-warning-chip type="chip" size="default" [selected]="true" label="Text"></orbit-warning-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-warning-chip type="chip" size="compact" label="Text"></orbit-warning-chip>
          <orbit-warning-chip type="chip" size="compact" [selected]="true" label="Text"></orbit-warning-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-warning-chip type="tag" size="default" label="Text"></orbit-warning-chip>
          <orbit-warning-chip type="tag" size="default" [selected]="true" label="Text"></orbit-warning-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-warning-chip type="tag" size="compact" label="Text"></orbit-warning-chip>
          <orbit-warning-chip type="tag" size="compact" [selected]="true" label="Text"></orbit-warning-chip>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Switch Storybook **Theme** to **n-grey** to see warning chip colors from tokens.',
      },
    },
  },
};
