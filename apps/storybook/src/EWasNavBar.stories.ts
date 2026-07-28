import type { Meta, StoryObj } from '@storybook/angular';
import {
  defaultEWasNavBarPrimaryItems,
  defaultEWasNavBarUtilityItems,
  EWasNavBarComponent,
} from 'orbit-ds-components';

const meta: Meta<EWasNavBarComponent> = {
  title: 'Components/eWAS Nav Bar',
  component: EWasNavBarComponent,
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
    activeItemId: { control: false },
  },
  args: {
    flight: true,
    orientation: 'horizontal',
    primaryItems: defaultEWasNavBarPrimaryItems,
    utilityItems: defaultEWasNavBarUtilityItems,
  },
  decorators: [
    (storyFn, context) => {
      const story = storyFn();
      const height = context.args['orientation'] === 'vertical' ? 1109 : 720;
      return {
        ...story,
        template: `<div style="height: ${height}px;">${story.template}</div>`,
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
      <orbit-ewas-nav-bar [flight]="flight" [orientation]="orientation"></orbit-ewas-nav-bar>
    `,
  }),
};

export default meta;

type Story = StoryObj<EWasNavBarComponent>;

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
  render: () => ({
    props: {
      activeItemId: 'airport' as string | null,
      onItemSelect(id: string | null) {
        this['activeItemId'] = id;
      },
    },
    template: `
      <div style="height: 720px;">
        <orbit-ewas-nav-bar
          [flight]="true"
          orientation="horizontal"
          [activeItemId]="activeItemId"
          (itemSelect)="onItemSelect($event)"
        ></orbit-ewas-nav-bar>
      </div>
    `,
  }),
};

/** Figma eWAS Nav Bar frame (4491:87974) — six orientation × flight variants. */
export const FigmaMatrix: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 24px; align-items: start;">
        <div style="height: 720px;">
          <orbit-ewas-nav-bar [flight]="true" orientation="horizontal"></orbit-ewas-nav-bar>
        </div>
        <div style="height: 720px;">
          <orbit-ewas-nav-bar [flight]="false" orientation="horizontal"></orbit-ewas-nav-bar>
        </div>
        <div style="height: 720px;">
          <orbit-ewas-nav-bar [flight]="true" orientation="splitView"></orbit-ewas-nav-bar>
        </div>
        <div style="height: 1109px;">
          <orbit-ewas-nav-bar [flight]="true" orientation="vertical"></orbit-ewas-nav-bar>
        </div>
        <div style="height: 1109px;">
          <orbit-ewas-nav-bar [flight]="false" orientation="vertical"></orbit-ewas-nav-bar>
        </div>
        <div style="height: 720px;">
          <orbit-ewas-nav-bar [flight]="false" orientation="splitView"></orbit-ewas-nav-bar>
        </div>
      </div>
    `,
  }),
};
