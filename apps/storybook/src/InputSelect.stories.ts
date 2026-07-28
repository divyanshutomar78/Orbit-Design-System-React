import type { Meta, StoryObj } from '@storybook/angular';
import { InputSelectComponent } from 'orbit-ds-components';

const sampleOptions = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
  { value: 'three', label: 'Option three' },
];

const meta: Meta<InputSelectComponent> = {
  title: 'Components/Input Select',
  component: InputSelectComponent,
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
      options: ['placeholder', 'value', 'label', 'labelValue', 'valueLabel', 'labelValueLabel'],
    },
    visualState: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'error', 'disabled'],
    },
    options: { control: false },
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
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div style="width: 460px;">${story.template}</div>`,
      };
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-input-select
        [label]="label"
        [showLabel]="showLabel"
        [showLabelInfo]="showLabelInfo"
        [placeholder]="placeholder"
        [helper]="helper"
        [showHelper]="showHelper"
        [showBottomSpaceHelper]="showBottomSpaceHelper"
        [errorMessage]="errorMessage"
        [showErrorMessage]="showErrorMessage"
        [contentType]="contentType"
        [visualState]="visualState"
        [displayValue]="displayValue"
        [inlineLabel]="inlineLabel"
        [showRightIcons]="showRightIcons"
        [showSelectIcon]="showSelectIcon"
        [showClearIcon]="showClearIcon"
        [disabled]="disabled"
      ></orbit-input-select>
    `,
  }),
};

export default meta;

type Story = StoryObj<InputSelectComponent>;

/** Figma Input Select (800:4645) — default placeholder (no options). */
export const Default: Story = {};

/** Click field to open Action Menu dropdown. */
export const DefaultWithOptions: Story = {
  args: {
    options: sampleOptions,
    showSelectIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-input-select
        [label]="label"
        [options]="options"
        [showSelectIcon]="showSelectIcon"
      ></orbit-input-select>
    `,
  }),
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
  args: {
    label: 'Label',
    options: sampleOptions,
    value: 'two',
    showRightIcons: true,
    showSelectIcon: true,
    showClearIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-input-select
        [label]="label"
        [options]="options"
        [(value)]="value"
        [showRightIcons]="showRightIcons"
        [showSelectIcon]="showSelectIcon"
        [showClearIcon]="showClearIcon"
      ></orbit-input-select>
    `,
  }),
};

export const WithOptionsAndHelper: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options: sampleOptions,
    value: '',
    showBottomSpaceHelper: true,
    showHelper: true,
    showClearIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-input-select
        [label]="label"
        [placeholder]="placeholder"
        [options]="options"
        [(value)]="value"
        [showBottomSpaceHelper]="showBottomSpaceHelper"
        [showHelper]="showHelper"
        [showClearIcon]="showClearIcon"
      ></orbit-input-select>
    `,
  }),
};

/** Figma _Input_background states. */
export const StateMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <orbit-input-select visualState="default"></orbit-input-select>
        <orbit-input-select visualState="hover"></orbit-input-select>
        <orbit-input-select
          contentType="value"
          displayValue="Value"
          visualState="selected"
          [showRightIcons]="true"
          [showSelectIcon]="true"
        ></orbit-input-select>
        <orbit-input-select
          [showBottomSpaceHelper]="true"
          [showErrorMessage]="true"
          visualState="error"
        ></orbit-input-select>
        <orbit-input-select [disabled]="true" visualState="disabled"></orbit-input-select>
      </div>
    `,
  }),
};
