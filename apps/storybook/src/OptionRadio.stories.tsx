import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OptionRadio } from 'orbit-ds-components';

const meta: Meta<typeof OptionRadio> = {
  title: 'Components/Option Radio',
  component: OptionRadio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean', description: 'Figma Selected' },
    status: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Figma Status',
    },
    textSlot: { control: false },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    selected: false,
    status: 'default',
    iconSize: 'big',
    disabled: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof OptionRadio>;

export const Unselected: Story = {
  args: { selected: false, status: 'default' },
};

export const Selected: Story = {
  args: { selected: true, status: 'default' },
};

export const Hover: Story = {
  args: { selected: false, status: 'hover' },
};

export const Disabled: Story = {
  args: { selected: false, status: 'disabled', disabled: true },
};

export const SelectedDisabled: Story = {
  args: { selected: true, status: 'disabled', disabled: true },
};

/** Figma Option Radio (570:29315) — six variants. */
export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 165 }}>
      <OptionRadio selected={false} status="default" />
      <OptionRadio selected={false} status="hover" />
      <OptionRadio selected={false} status="disabled" disabled />
      <OptionRadio selected status="default" />
      <OptionRadio selected status="hover" />
      <OptionRadio selected status="disabled" disabled />
    </div>
  ),
};

export const RadioGroup: Story = {
  render: function Render() {
    const [value, setValue] = useState('b');
    return (
      <div
        role="radiogroup"
        aria-label="Options"
        style={{ display: 'flex', flexDirection: 'column', width: 165 }}
      >
        <OptionRadio
          name="demo"
          value="a"
          label="Option A"
          selected={value === 'a'}
          onChange={() => setValue('a')}
        />
        <OptionRadio
          name="demo"
          value="b"
          label="Option B"
          selected={value === 'b'}
          onChange={() => setValue('b')}
        />
        <OptionRadio
          name="demo"
          value="c"
          label="Option C"
          selected={value === 'c'}
          onChange={() => setValue('c')}
        />
      </div>
    );
  },
};
