import type { Meta, StoryObj } from '@storybook/react';
import {
  LabelValueHorizontal,
  Tooltip,
  TooltipPopup,
} from '@orbit/components';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
    popupContent: { control: false },
    trigger: { control: false },
  },
  args: {
    direction: 'right',
    text: 'Toolem ipsum',
    showText: true,
    triggerLabel: 'More information',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Popup: StoryObj<typeof TooltipPopup> = {
  render: (args) => <TooltipPopup {...args} />,
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
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 48,
        padding: 120,
        alignItems: 'end',
      }}
    >
      <Tooltip direction="right" open={false} />
      <Tooltip direction="right" open />
      <Tooltip direction="left" open={false} />
      <Tooltip direction="left" open />
    </div>
  ),
};

/** Figma example with Label Value rows (4773:145640). */
export const RichContent: Story = {
  args: {
    open: true,
    showText: false,
    popupContent: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
        <LabelValueHorizontal
          layout="L + V"
          label="GPS Enabled"
          value="2 mins ago"
          style={{
            paddingBottom: 8,
            borderBottom: '1px solid var(--border-secondary)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <LabelValueHorizontal layout="L + V" label="Lat" value="51.4780" />
          <LabelValueHorizontal layout="L + V" label="Long" value="0.4620" />
        </div>
      </div>
    ),
  },
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
