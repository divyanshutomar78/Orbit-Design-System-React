import type { Meta, StoryObj } from '@storybook/angular';
import { EWasNavItemWTextComponent } from 'orbit-ds-components';

const meta: Meta<EWasNavItemWTextComponent> = {
  title: 'Components/eWAS Nav Item w Text',
  component: EWasNavItemWTextComponent,
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
  render: (args) => ({
    props: args,
    template: `
      <orbit-ewas-nav-item-w-text
        [characters]="characters"
        [primaryText]="primaryText"
        [secondaryText]="secondaryText"
        [orientation]="orientation"
        [state]="state"
        [iconSize]="iconSize"
      ></orbit-ewas-nav-item-w-text>
    `,
  }),
};

export default meta;

type Story = StoryObj<EWasNavItemWTextComponent>;

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
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 16px; justify-items: center;">
          <orbit-ewas-nav-item-w-text characters="6" orientation="horizontal"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="7" orientation="horizontal"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="8" orientation="horizontal"></orbit-ewas-nav-item-w-text>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 16px; justify-items: center;">
          <orbit-ewas-nav-item-w-text characters="6" orientation="vertical"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="7" orientation="vertical"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="8" orientation="vertical"></orbit-ewas-nav-item-w-text>
        </div>
        <div style="display: flex; gap: 16px;">
          <orbit-ewas-nav-item-w-text characters="default" orientation="splitView" state="default"></orbit-ewas-nav-item-w-text>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 16px; justify-items: center;">
          <orbit-ewas-nav-item-w-text characters="6" orientation="horizontal" state="selected"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="7" orientation="horizontal" state="selected"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="8" orientation="horizontal" state="selected"></orbit-ewas-nav-item-w-text>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 16px; justify-items: center;">
          <orbit-ewas-nav-item-w-text characters="6" orientation="vertical" state="selected"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="7" orientation="vertical" state="selected"></orbit-ewas-nav-item-w-text>
          <orbit-ewas-nav-item-w-text characters="8" orientation="vertical" state="selected"></orbit-ewas-nav-item-w-text>
        </div>
        <div style="display: flex; gap: 16px;">
          <orbit-ewas-nav-item-w-text characters="default" orientation="splitView" state="selected"></orbit-ewas-nav-item-w-text>
        </div>
      </div>
    `,
  }),
};
