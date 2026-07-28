import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LabelValueHorizontalComponent, TooltipComponent, TooltipPopupComponent } from 'orbit-ds-components';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Figma Direction',
    },
    open: { control: 'boolean', description: 'Figma State' },
    text: { control: 'text' },
    showText: { control: 'boolean', description: 'Figma Show Default Text' },
  },
  args: {
    direction: 'right',
    text: 'Toolem ipsum',
    showText: true,
    triggerLabel: 'More information',
  },
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent, TooltipPopupComponent, LabelValueHorizontalComponent],
    }),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-tooltip
        [direction]="direction"
        [open]="open"
        [text]="text"
        [showText]="showText"
        [triggerLabel]="triggerLabel"
      ></orbit-tooltip>
    `,
  }),
};

export default meta;

type Story = StoryObj<TooltipComponent>;

export const Popup: StoryObj<TooltipPopupComponent> = {
  render: (args) => ({
    props: args,
    template: `<orbit-tooltip-popup [text]="text" [showText]="showText"></orbit-tooltip-popup>`,
  }),
  args: { text: 'Toolem ipsum', showText: true },
};

export const Closed: Story = {
  args: { open: false },
};

export const Open: Story = {
  args: { open: true },
};

export const OpenLeft: Story = {
  args: { open: true, direction: 'left' },
};

/** Figma Tooltip with i — Direction × State. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 48px; padding: 120px; align-items: end;">
        <orbit-tooltip direction="right" [open]="false"></orbit-tooltip>
        <orbit-tooltip direction="right" [open]="true"></orbit-tooltip>
        <orbit-tooltip direction="left" [open]="false"></orbit-tooltip>
        <orbit-tooltip direction="left" [open]="true"></orbit-tooltip>
      </div>
    `,
  }),
};

/** Figma example with Label Value rows (4773:145640). */
export const RichContent: Story = {
  args: {
    open: true,
    showText: false,
  },
  render: (args) => ({
    props: { ...args, usePopupContentSlot: true },
    template: `
      <orbit-tooltip [direction]="direction" [open]="open" [showText]="showText" [usePopupContentSlot]="true">
        <div orbitPopupContent style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
          <orbit-label-value-horizontal
            layout="L + V"
            label="GPS Enabled"
            value="2 mins ago"
            style="padding-bottom: 8px; border-bottom: 1px solid var(--border-secondary);"
          ></orbit-label-value-horizontal>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <orbit-label-value-horizontal layout="L + V" label="Lat" value="51.4780"></orbit-label-value-horizontal>
            <orbit-label-value-horizontal layout="L + V" label="Long" value="0.4620"></orbit-label-value-horizontal>
          </div>
        </div>
      </orbit-tooltip>
    `,
  }),
};

export const HoverInteraction: Story = {
  args: { text: 'Hover or focus the info icon to show this tooltip.' },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled: hover or keyboard focus opens the popup.',
      },
    },
  },
};
