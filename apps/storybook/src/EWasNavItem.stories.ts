import type { Meta, StoryObj } from '@storybook/angular';
import { EWasNavItemComponent } from 'orbit-ds-components';

const meta: Meta<EWasNavItemComponent> = {
  title: 'Components/eWAS Nav Item',
  component: EWasNavItemComponent,
  tags: ['autodocs'],
  argTypes: {
    navItem: { control: 'text', description: 'Figma Nav Item' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'splitView', 'vertical'],
      description: 'Figma Orientation',
    },
    state: {
      control: 'select',
      options: ['default', 'active', 'disabled'],
      description: 'Figma State',
    },
    iconSize: { control: 'select', options: ['small', 'big'] },
  },
  args: {
    navItem: 'Flights',
    orientation: 'horizontal',
    state: 'default',
    iconSize: 'big',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-ewas-nav-item
        [navItem]="navItem"
        [orientation]="orientation"
        [state]="state"
        [iconSize]="iconSize"
      ></orbit-ewas-nav-item>
    `,
  }),
};

export default meta;

type Story = StoryObj<EWasNavItemComponent>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    state: 'active',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
};

export const SplitView: Story = {
  args: {
    orientation: 'splitView',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

/** Figma eWAS Nav Item frame (4486:143873) — 3×3 variant matrix. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 20px; align-items: center; justify-items: center;">
        <orbit-ewas-nav-item orientation="horizontal" state="default"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="horizontal" state="active"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="horizontal" state="disabled"></orbit-ewas-nav-item>

        <orbit-ewas-nav-item orientation="splitView" state="default"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="splitView" state="active"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="splitView" state="disabled"></orbit-ewas-nav-item>

        <orbit-ewas-nav-item orientation="vertical" state="default"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="vertical" state="active"></orbit-ewas-nav-item>
        <orbit-ewas-nav-item orientation="vertical" state="disabled"></orbit-ewas-nav-item>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Rows: Horizontal, Split View, Vertical. Columns: Default, Active, Disabled.',
      },
    },
  },
};
