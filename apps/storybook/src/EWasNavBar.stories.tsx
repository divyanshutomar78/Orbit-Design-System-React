import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  EWasNavBar,
  defaultEWasNavBarPrimaryItems,
  defaultEWasNavBarUtilityItems,
} from 'orbit-ds-components';

const meta: Meta<typeof EWasNavBar> = {
  title: 'Components/eWAS Nav Bar',
  component: EWasNavBar,
  tags: ['autodocs'],
  argTypes: {
    flight: { control: 'boolean', description: 'Figma Flight' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical', 'splitView'],
      description: 'Figma Orientation',
    },
    primaryItems: { control: false },
    utilityItems: { control: false },
    footerItem: { control: false },
    flightHeader: { control: false },
    branding: { control: false },
    activeItemId: { control: false },
    onItemSelect: { control: false },
  },
  args: {
    flight: true,
    orientation: 'horizontal',
    primaryItems: defaultEWasNavBarPrimaryItems,
    utilityItems: defaultEWasNavBarUtilityItems,
  },
  decorators: [
    (Story, context) => {
      const height =
        context.args.orientation === 'vertical' ? 1109 : 720;
      return (
        <div style={{ height }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof EWasNavBar>;

export const FlightHorizontal: Story = {
  args: {
    flight: true,
    orientation: 'horizontal',
  },
};

export const FlightVertical: Story = {
  args: {
    flight: true,
    orientation: 'vertical',
  },
};

export const FlightSplitView: Story = {
  args: {
    flight: true,
    orientation: 'splitView',
  },
};

export const BrandHorizontal: Story = {
  args: {
    flight: false,
    orientation: 'horizontal',
  },
};

export const BrandVertical: Story = {
  args: {
    flight: false,
    orientation: 'vertical',
  },
};

export const BrandSplitView: Story = {
  args: {
    flight: false,
    orientation: 'splitView',
  },
};

/** Controlled selection — parent owns `activeItemId`. */
export const Controlled: Story = {
  render: function Render() {
    const [activeItemId, setActiveItemId] = useState<string | null>('airport');

    return (
      <EWasNavBar
        flight
        orientation="horizontal"
        activeItemId={activeItemId}
        onItemSelect={setActiveItemId}
      />
    );
  },
  decorators: [
    (Story) => (
      <div style={{ height: 720 }}>
        <Story />
      </div>
    ),
  ],
};

/** Figma eWAS Nav Bar frame (4491:87974) — six orientation × flight variants. */
export const FigmaMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <div style={{ height: 720 }}>
        <EWasNavBar flight orientation="horizontal" />
      </div>
      <div style={{ height: 720 }}>
        <EWasNavBar flight={false} orientation="horizontal" />
      </div>
      <div style={{ height: 720 }}>
        <EWasNavBar flight orientation="splitView" />
      </div>
      <div style={{ height: 1109 }}>
        <EWasNavBar flight orientation="vertical" />
      </div>
      <div style={{ height: 1109 }}>
        <EWasNavBar flight={false} orientation="vertical" />
      </div>
      <div style={{ height: 720 }}>
        <EWasNavBar flight={false} orientation="splitView" />
      </div>
    </div>
  ),
};
