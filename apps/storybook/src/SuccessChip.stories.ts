import type { Meta, StoryObj } from '@storybook/angular';
import { SuccessChipComponent } from 'orbit-ds-components';

const meta: Meta<SuccessChipComponent> = {
  title: 'Components/Success Chip',
  component: SuccessChipComponent,
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
      <orbit-success-chip
        [type]="type"
        [size]="size"
        [selected]="selected"
        [iconSize]="iconSize"
        [showIcon]="showIcon"
        [disabled]="disabled"
        [label]="label"
      ></orbit-success-chip>
    `,
  }),
};

export default meta;

type Story = StoryObj<SuccessChipComponent>;

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

/** Mirrors Figma _Success Chip matrix (4917:94234). Use Theme n-grey for green tones. */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 16px; padding: 24px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-success-chip type="chip" size="default" label="Text"></orbit-success-chip>
          <orbit-success-chip type="chip" size="default" [selected]="true" label="Text"></orbit-success-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-success-chip type="chip" size="compact" label="Text"></orbit-success-chip>
          <orbit-success-chip type="chip" size="compact" [selected]="true" label="Text"></orbit-success-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-success-chip type="tag" size="default" label="Text"></orbit-success-chip>
          <orbit-success-chip type="tag" size="default" [selected]="true" label="Text"></orbit-success-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <orbit-success-chip type="tag" size="compact" label="Text"></orbit-success-chip>
          <orbit-success-chip type="tag" size="compact" [selected]="true" label="Text"></orbit-success-chip>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Switch Storybook **Theme** to **n-grey** to see success chip colors from tokens.',
      },
    },
  },
};
