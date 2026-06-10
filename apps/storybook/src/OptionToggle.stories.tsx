import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OptionToggle } from 'orbit-ds-components';

const meta: Meta<typeof OptionToggle> = {
  title: 'Components/Option Toggle',
  component: OptionToggle,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    state: {
      control: 'select',
      options: ['off', 'on', 'partial'],
      description: 'Figma State',
    },
    status: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Figma Status',
    },
    showRightIcon: { control: 'boolean', description: 'Figma showRightIcon' },
    checked: { control: 'boolean' },
    partial: { control: 'boolean' },
    textSlot: { control: false },
    rightIcon: { control: false },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    state: 'off',
    status: 'default',
    showRightIcon: false,
    iconSize: 'big',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof OptionToggle>;

export const Off: Story = {
  args: { state: 'off', status: 'default' },
};

export const On: Story = {
  args: { state: 'on', status: 'default' },
};

export const Partial: Story = {
  args: { state: 'partial', status: 'default' },
};

export const WithRightIcon: Story = {
  args: { state: 'on', showRightIcon: true },
};

export const Disabled: Story = {
  args: { state: 'off', status: 'disabled', disabled: true },
};

/** Figma Option Toggle (569:28473) — nine variants. */
export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 165 }}>
      <OptionToggle state="off" status="default" />
      <OptionToggle state="off" status="hover" />
      <OptionToggle state="off" status="disabled" disabled />
      <OptionToggle state="on" status="default" />
      <OptionToggle state="on" status="hover" />
      <OptionToggle state="on" status="disabled" disabled />
      <OptionToggle state="partial" status="default" />
      <OptionToggle state="partial" status="hover" />
      <OptionToggle state="partial" status="disabled" disabled />
    </div>
  ),
};

export const Interactive: Story = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return (
      <OptionToggle
        label="Enable feature"
        state={on ? 'on' : 'off'}
        onChange={() => setOn((value) => !value)}
      />
    );
  },
};
