import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TitleTabComponent, TitlesAndTabsComponent } from 'orbit-ds-components';

const meta: Meta<TitlesAndTabsComponent> = {
  title: 'Components/Titles and Tabs',
  component: TitlesAndTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    showTitleIcon: { control: 'boolean', description: 'Figma Show Title Icon' },
    showLeftIcon: { control: 'boolean', description: 'Figma Show Left Icon' },
    showTabs: { control: 'boolean', description: 'Figma Show Tabs' },
    showExtraSlot: { control: 'boolean', description: 'Figma Add Extra Components' },
    showRightIcons: { control: 'boolean', description: 'Figma Show Right Icons' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    title: { control: 'text' },
    tabItems: { control: false },
  },
  args: {
    title: 'Title',
    showTitleIcon: true,
    showLeftIcon: true,
    showTabs: true,
    showExtraSlot: true,
    showRightIcons: true,
    iconSize: 'big',
  },
  decorators: [
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div style="width: 535px;">${story.template}</div>`,
      };
    },
    moduleMetadata({ imports: [TitlesAndTabsComponent, TitleTabComponent] }),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'padded',
  },
  render: (args) => ({
    props: args,
    template: `
      <orbit-titles-and-tabs
        [title]="title"
        [showTitleIcon]="showTitleIcon"
        [showLeftIcon]="showLeftIcon"
        [showTabs]="showTabs"
        [showExtraSlot]="showExtraSlot"
        [showRightIcons]="showRightIcons"
        [iconSize]="iconSize"
      ></orbit-titles-and-tabs>
    `,
  }),
};

export default meta;

type Story = StoryObj<TitlesAndTabsComponent>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    showTabs: false,
    showExtraSlot: false,
    showRightIcons: false,
  },
};

export const WithMultipleTabs: Story = {
  render: () => ({
    props: {
      active: 'tab-1',
      tabDefs: [
        { id: 'tab-1', label: 'Tab' },
        { id: 'tab-2', label: 'Settings' },
        { id: 'tab-3', label: 'Details' },
      ],
      get tabItems() {
        return this['tabDefs'].map((tab: { id: string; label: string }) => ({
          ...tab,
          selected: tab.id === this['active'],
        }));
      },
      onTabSelect(id: string) {
        this['active'] = id;
      },
    },
    template: `
      <orbit-titles-and-tabs title="Title" [tabItems]="tabItems" (tabSelect)="onTabSelect($event)"></orbit-titles-and-tabs>
    `,
  }),
};

export const CustomTabsSlot: Story = {
  render: () => ({
    template: `
      <orbit-titles-and-tabs [useTabsSlot]="true">
        <orbit-title-tab orbitTabs [selected]="true" label="Active"></orbit-title-tab>
        <orbit-title-tab orbitTabs label="Other"></orbit-title-tab>
      </orbit-titles-and-tabs>
    `,
  }),
};

export const Minimal: Story = {
  args: {
    showLeftIcon: false,
    showTabs: false,
    showExtraSlot: false,
    showRightIcons: false,
  },
};

export const SmallIcons: Story = {
  args: {
    iconSize: 'small',
  },
};
