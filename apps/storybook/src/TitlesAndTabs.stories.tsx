import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TitlesAndTabs, TitleTab } from 'orbit-ds-components';

const meta: Meta<typeof TitlesAndTabs> = {
  title: 'Components/Titles and Tabs',
  component: TitlesAndTabs,
  tags: ['autodocs'],
  argTypes: {
    showTitleIcon: { control: 'boolean', description: 'Figma Show Title Icon' },
    showLeftIcon: { control: 'boolean', description: 'Figma Show Left Icon' },
    showTabs: { control: 'boolean', description: 'Figma Show Tabs' },
    showExtraSlot: { control: 'boolean', description: 'Figma Add Extra Components' },
    showRightIcons: { control: 'boolean', description: 'Figma Show Right Icons' },
    iconSize: { control: 'select', options: ['small', 'big'] },
    title: { control: 'text' },
    tabs: { control: false },
    tabItems: { control: false },
    onTabSelect: { control: false },
    leftIcon: { control: false },
    rightIcons: { control: false },
    extraSlot: { control: false },
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
    (Story) => (
      <div style={{ width: 535 }}>
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

type Story = StoryObj<typeof TitlesAndTabs>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    showTabs: false,
    showExtraSlot: false,
    showRightIcons: false,
  },
};

export const WithMultipleTabs: Story = {
  render: function Render() {
    const [active, setActive] = useState('tab-1');
    return (
      <TitlesAndTabs
        title="Title"
        tabItems={[
          { id: 'tab-1', label: 'Tab', selected: active === 'tab-1' },
          { id: 'tab-2', label: 'Settings', selected: active === 'tab-2' },
          { id: 'tab-3', label: 'Details', selected: active === 'tab-3' },
        ]}
        onTabSelect={setActive}
      />
    );
  },
};

export const CustomTabsSlot: Story = {
  args: {
    tabs: (
      <>
        <TitleTab selected>Active</TitleTab>
        <TitleTab>Other</TitleTab>
      </>
    ),
  },
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
