import type { Meta, StoryObj } from '@storybook/react';
import { EWasNavItemWText } from '@orbit/components';

const meta: Meta<typeof EWasNavItemWText> = {
  title: 'Components/eWAS Nav Item w Text',
  component: EWasNavItemWText,
  tags: ['autodocs'],
  argTypes: {
    characters: {
      control: 'select',
      options: ['default', '6', '7', '8'],
      description: 'Figma Characters',
    },
    primaryText: { control: 'text' },
    secondaryText: { control: 'text' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'splitView', 'vertical'],
      description: 'Figma Orientation',
    },
    state: {
      control: 'select',
      options: ['default', 'selected'],
      description: 'Figma State',
    },
    iconSize: { control: 'select', options: ['small', 'big'] },
    icon: { control: false },
    disabled: { control: false },
  },
  args: {
    characters: '6',
    orientation: 'horizontal',
    state: 'default',
    iconSize: 'big',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof EWasNavItemWText>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    state: 'selected',
  },
};

export const Characters7: Story = {
  args: {
    characters: '7',
  },
};

export const Characters8: Story = {
  args: {
    characters: '8',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const SplitView: Story = {
  args: {
    characters: 'default',
    orientation: 'splitView',
  },
};

/** Figma eWAS Nav Item w text frame (4487:144286). */
export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 16,
          justifyItems: 'center',
        }}
      >
        <EWasNavItemWText characters="6" orientation="horizontal" />
        <EWasNavItemWText characters="7" orientation="horizontal" />
        <EWasNavItemWText characters="8" orientation="horizontal" />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 16,
          justifyItems: 'center',
        }}
      >
        <EWasNavItemWText characters="6" orientation="vertical" />
        <EWasNavItemWText characters="7" orientation="vertical" />
        <EWasNavItemWText characters="8" orientation="vertical" />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <EWasNavItemWText
          characters="default"
          orientation="splitView"
          state="default"
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 16,
          justifyItems: 'center',
        }}
      >
        <EWasNavItemWText
          characters="6"
          orientation="horizontal"
          state="selected"
        />
        <EWasNavItemWText
          characters="7"
          orientation="horizontal"
          state="selected"
        />
        <EWasNavItemWText
          characters="8"
          orientation="horizontal"
          state="selected"
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: 16,
          justifyItems: 'center',
        }}
      >
        <EWasNavItemWText
          characters="6"
          orientation="vertical"
          state="selected"
        />
        <EWasNavItemWText
          characters="7"
          orientation="vertical"
          state="selected"
        />
        <EWasNavItemWText
          characters="8"
          orientation="vertical"
          state="selected"
        />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <EWasNavItemWText
          characters="default"
          orientation="splitView"
          state="selected"
        />
      </div>
    </div>
  ),
};
