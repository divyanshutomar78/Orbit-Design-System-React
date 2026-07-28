import type { Decorator, Meta, StoryObj } from '@storybook/angular';
import { ListingItemComponent } from 'orbit-ds-components';

const withFixedWidth: Decorator = (storyFn) => {
  const story = storyFn();
  return {
    ...story,
    template: `<div style="width: 298px;">${story.template}</div>`,
  };
};

const meta: Meta<ListingItemComponent> = {
  title: 'Components/Listing Item',
  component: ListingItemComponent,
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
    interactive: { control: 'boolean' },
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
  decorators: [withFixedWidth],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-listing-item
        [multiLine]="multiLine"
        [reorderIcon]="reorderIcon"
        [iconSize]="iconSize"
        [showLeftIcon]="showLeftIcon"
        [showRightIcon]="showRightIcon"
        [showTitle]="showTitle"
        [showLabelValue]="showLabelValue"
        [showHelper]="showHelper"
        [title]="title"
        [label]="label"
        [value]="value"
        [helper]="helper"
        [interactive]="interactive"
      ></orbit-listing-item>
    `,
  }),
};

export default meta;

type Story = StoryObj<ListingItemComponent>;

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
    interactive: true,
  },
};

/** Matches Figma Listing item frame (908:1711) — single-line + multi-line rows. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="width: 298px; border-radius: 4px; overflow: hidden;">
        <orbit-listing-item></orbit-listing-item>
        <orbit-listing-item [multiLine]="true" [showHelper]="true"></orbit-listing-item>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Two rows from Figma: Multi-line=False and Multi-line=True.',
      },
    },
  },
};

export const Playground: Story = {};
