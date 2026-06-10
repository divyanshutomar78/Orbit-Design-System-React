import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputSelect } from 'orbit-ds-components';

const sampleOptions = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
  { value: 'three', label: 'Option three' },
];

const meta: Meta<typeof InputSelect> = {
  title: 'Components/Input Select',
  component: InputSelect,
  tags: ['autodocs'],
  argTypes: {
    showLabel: { control: 'boolean', description: 'Figma Show Label' },
    showLabelInfo: { control: 'boolean' },
    showHelper: { control: 'boolean', description: 'Figma Show Helper' },
    showBottomSpaceHelper: {
      control: 'boolean',
      description: 'Figma Show Bottom Space Helper',
    },
    showErrorMessage: {
      control: 'boolean',
      description: 'Figma Show Error Message',
    },
    showRightIcons: { control: 'boolean' },
    showSelectIcon: { control: 'boolean' },
    showClearIcon: { control: 'boolean' },
    showFieldInfoIcon: { control: 'boolean' },
    contentType: {
      control: 'select',
      options: [
        'placeholder',
        'value',
        'label',
        'labelValue',
        'valueLabel',
        'labelValueLabel',
      ],
    },
    visualState: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'error', 'disabled'],
    },
    options: { control: false },
    onValueChange: { control: false },
    onClear: { control: false },
  },
  args: {
    label: 'Label',
    showLabel: true,
    showLabelInfo: true,
    placeholder: 'Placeholder',
    helper: 'Helper',
    showHelper: true,
    showBottomSpaceHelper: false,
    errorMessage: 'ErrorMessage',
    showErrorMessage: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 460 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof InputSelect>;

/** Figma Input Select (800:4645) — default placeholder (no options). */
export const Default: Story = {};

/** Click field to open Action Menu dropdown. */
export const DefaultWithOptions: Story = {
  args: {
    options: sampleOptions,
    showSelectIcon: true,
  },
};

export const WithHelper: Story = {
  args: {
    showBottomSpaceHelper: true,
  },
};

export const WithError: Story = {
  args: {
    showBottomSpaceHelper: true,
    showErrorMessage: true,
    visualState: 'error',
  },
};

export const SelectedValue: Story = {
  args: {
    contentType: 'value',
    displayValue: 'Value',
    visualState: 'selected',
    showRightIcons: true,
    showSelectIcon: true,
  },
};

export const InlineLabelValue: Story = {
  args: {
    contentType: 'labelValue',
    inlineLabel: 'Label',
    displayValue: 'Value',
    visualState: 'selected',
    showRightIcons: true,
    showSelectIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    visualState: 'disabled',
  },
};

export const Hover: Story = {
  args: {
    visualState: 'hover',
  },
};

export const WithOptions: Story = {
  render: function Render() {
    const [value, setValue] = useState('two');
    return (
      <InputSelect
        label="Label"
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
        showRightIcons
        showSelectIcon
        showClearIcon
        onClear={() => setValue('')}
      />
    );
  },
};

export const WithOptionsAndHelper: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <InputSelect
        label="Label"
        placeholder="Placeholder"
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
        showBottomSpaceHelper
        showHelper
        showClearIcon
        onClear={() => setValue('')}
      />
    );
  },
};

/** Figma _Input_background states. */
export const StateMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <InputSelect visualState="default" />
      <InputSelect visualState="hover" />
      <InputSelect
        contentType="value"
        displayValue="Value"
        visualState="selected"
        showRightIcons
        showSelectIcon
      />
      <InputSelect
        showBottomSpaceHelper
        showErrorMessage
        visualState="error"
      />
      <InputSelect disabled visualState="disabled" />
    </div>
  ),
};
