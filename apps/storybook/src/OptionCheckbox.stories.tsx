import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OptionCheckbox } from '@orbit/components';

const meta: Meta<typeof OptionCheckbox> = {
  title: 'Components/Option Checkbox',
  component: OptionCheckbox,
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
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    textSlot: { control: false },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    label: 'Option',
    state: 'off',
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

type Story = StoryObj<typeof OptionCheckbox>;

export const Off: Story = {
  args: { state: 'off', status: 'default' },
};

export const On: Story = {
  args: { state: 'on', status: 'default' },
};

export const Partial: Story = {
  args: { state: 'partial', status: 'default' },
};

export const Hover: Story = {
  args: { state: 'off', status: 'hover' },
};

export const Disabled: Story = {
  args: { state: 'off', status: 'disabled', disabled: true },
};

export const OnDisabled: Story = {
  args: { state: 'on', status: 'disabled', disabled: true },
};

/** Figma Option Checkbox (570:29495) — nine variants. */
export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 165 }}>
      <OptionCheckbox state="off" status="default" />
      <OptionCheckbox state="off" status="hover" />
      <OptionCheckbox state="off" status="disabled" disabled />
      <OptionCheckbox state="on" status="default" />
      <OptionCheckbox state="on" status="hover" />
      <OptionCheckbox state="on" status="disabled" disabled />
      <OptionCheckbox state="partial" status="default" />
      <OptionCheckbox state="partial" status="hover" />
      <OptionCheckbox state="partial" status="disabled" disabled />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['b']);

    const toggle = (id: string) => {
      setValues((current) =>
        current.includes(id)
          ? current.filter((value) => value !== id)
          : [...current, id],
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 165 }}>
        <OptionCheckbox
          label="Option A"
          state={values.includes('a') ? 'on' : 'off'}
          onChange={() => toggle('a')}
        />
        <OptionCheckbox
          label="Option B"
          state={values.includes('b') ? 'on' : 'off'}
          onChange={() => toggle('b')}
        />
        <OptionCheckbox
          label="Option C"
          state={values.includes('c') ? 'on' : 'off'}
          onChange={() => toggle('c')}
        />
      </div>
    );
  },
};
