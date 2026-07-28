import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  LabelValueHorizontalComponent,
  LabelValueVerticalComponent,
  ListingItemComponent,
  OptionCheckboxComponent,
  SuccessChipComponent,
} from 'orbit-ds-components';

/**
 * QA stories for ListingItem — exercises every prop and common composition
 * patterns (including table-style rows like user management lists).
 */
const meta: Meta<ListingItemComponent> = {
  title: 'QA/Listing Item',
  component: ListingItemComponent,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
  decorators: [
    moduleMetadata({
      imports: [
        ListingItemComponent,
        LabelValueHorizontalComponent,
        LabelValueVerticalComponent,
        OptionCheckboxComponent,
        SuccessChipComponent,
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<ListingItemComponent>;

const tableWidth = 'width: 100%; max-width: 960px; min-width: 640px;';
const columnHeaderStyle =
  'font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-secondary);';

/** All boolean prop combinations at a glance. */
export const PropMatrix: Story = {
  render: () => ({
    template: `
      <div style="${tableWidth} display: flex; flex-direction: column; gap: 24px;">
        <section>
          <h3 style="margin: 0 0 8px; font-size: 13px; color: #666;">Single-line variants</h3>
          <orbit-listing-item label="Default" value="Value"></orbit-listing-item>
          <orbit-listing-item [reorderIcon]="false" label="No reorder" value="Value"></orbit-listing-item>
          <orbit-listing-item [showLeftIcon]="false" label="No left icon" value="Value"></orbit-listing-item>
          <orbit-listing-item [showRightIcon]="false" label="No right icon" value="Value"></orbit-listing-item>
          <orbit-listing-item [showTitle]="true" label="With title" value="Value"></orbit-listing-item>
          <orbit-listing-item [showLabelValue]="false" [showTitle]="true" title="Title only"></orbit-listing-item>
          <orbit-listing-item iconSize="small" label="Small icons" value="Value"></orbit-listing-item>
          <orbit-listing-item [interactive]="true" label="Interactive" value="Value"></orbit-listing-item>
        </section>

        <section>
          <h3 style="margin: 0 0 8px; font-size: 13px; color: #666;">Multi-line variants</h3>
          <orbit-listing-item [multiLine]="true" title="Section" label="Label" value="Value"></orbit-listing-item>
          <orbit-listing-item
            [multiLine]="true"
            [showHelper]="true"
            title="With helper"
            label="Label"
            value="Value"
            helper="Additional context"
          ></orbit-listing-item>
          <orbit-listing-item
            [multiLine]="true"
            [reorderIcon]="false"
            [showLeftIcon]="false"
            [showRightIcon]="false"
            title="Minimal multi"
            label="Label"
            value="Value"
          ></orbit-listing-item>
        </section>

        <section>
          <h3 style="margin: 0 0 8px; font-size: 13px; color: #666;">Custom slots</h3>
          <orbit-listing-item [showLabelValue]="false">
            <orbit-label-value-vertical
              orbitLabelValue
              layout="V + L"
              value="Custom value"
              label="Custom label"
            ></orbit-label-value-vertical>
          </orbit-listing-item>
          <orbit-listing-item label="With chip action" value="Value">
            <orbit-success-chip orbitAddIcons type="chip" size="compact" label="Active"></orbit-success-chip>
          </orbit-listing-item>
        </section>
      </div>
    `,
  }),
};

const tableColumns = `
  <div style="flex: 0 0 80px; text-align: right;"><span style="${columnHeaderStyle}">Role</span></div>
  <div style="flex: 0 0 100px; text-align: right;"><span style="${columnHeaderStyle}">Status</span></div>
  <div style="flex: 0 0 100px; text-align: right;"><span style="${columnHeaderStyle}">Last seen</span></div>
`;

const tableRowColumns = (role: string, status: string, lastSeen: string) => `
  <div style="flex: 0 0 80px; text-align: right;">
    <orbit-label-value-horizontal layout="L" label="${role}"></orbit-label-value-horizontal>
  </div>
  <div style="flex: 0 0 100px; display: flex; justify-content: flex-end;">
    <orbit-success-chip type="chip" size="compact" label="${status}"></orbit-success-chip>
  </div>
  <div style="flex: 0 0 100px; text-align: right;">
    <orbit-label-value-horizontal layout="L" label="${lastSeen}"></orbit-label-value-horizontal>
  </div>
`;

/**
 * Recreates the user-management table row from the reported bug.
 * Uses ListingItem the way a consumer naturally would: checkbox projected as the
 * left icon, user info in the label/value slot, columns in the add-icons slot.
 */
export const UserTable_Recreation: Story = {
  name: 'User table — reported layout (broken)',
  render: () => ({
    template: `
      <div style="${tableWidth} background: #fff; border-radius: 4px;">
        <!-- Header row -->
        <orbit-listing-item [reorderIcon]="false" [showLabelValue]="false" [showRightIcon]="false">
          <orbit-option-checkbox orbitLeftIcon label="Option" iconSize="small"></orbit-option-checkbox>
          <span orbitLabelValue style="${columnHeaderStyle}">User</span>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">${tableColumns}</div>
        </orbit-listing-item>

        <!-- Data rows -->
        <orbit-listing-item [reorderIcon]="false" [showLabelValue]="false">
          <orbit-option-checkbox orbitLeftIcon label="Option" iconSize="small"></orbit-option-checkbox>
          <orbit-label-value-vertical
            orbitLabelValue
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          ></orbit-label-value-vertical>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        </orbit-listing-item>
        <orbit-listing-item [reorderIcon]="false" [showLabelValue]="false">
          <orbit-option-checkbox orbitLeftIcon label="Option" iconSize="small"></orbit-option-checkbox>
          <orbit-label-value-vertical
            orbitLabelValue
            layout="V + L"
            value="Bob Chen"
            label="bob@orbit.io"
          ></orbit-label-value-vertical>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Admin', 'Active', '2h ago')}
          </div>
        </orbit-listing-item>
        <orbit-listing-item [reorderIcon]="false" [showLabelValue]="false">
          <orbit-option-checkbox orbitLeftIcon label="Option" iconSize="small"></orbit-option-checkbox>
          <orbit-label-value-vertical
            orbitLabelValue
            layout="V + L"
            value="Carol Diaz"
            label="carol@orbit.io"
          ></orbit-label-value-vertical>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Member', 'Inactive', '3d ago')}
          </div>
        </orbit-listing-item>
      </div>
    `,
  }),
};

/** Checkbox only (no label) — common fix attempt for vertical "Option" text. */
export const UserTable_CheckboxNoLabel: Story = {
  name: 'User table — checkbox without label',
  render: () => ({
    template: `
      <div style="${tableWidth} background: #fff; border-radius: 4px;">
        <orbit-listing-item [reorderIcon]="false" [showLabelValue]="false">
          <orbit-option-checkbox orbitLeftIcon label="" aria-label="Select row" iconSize="small"></orbit-option-checkbox>
          <orbit-label-value-vertical
            orbitLabelValue
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          ></orbit-label-value-vertical>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        </orbit-listing-item>
      </div>
    `,
  }),
};

/** Checkbox in reorder slot instead of leftIcon. */
export const UserTable_CheckboxInReorder: Story = {
  name: 'User table — checkbox in reorder slot',
  render: () => ({
    template: `
      <div style="${tableWidth} background: #fff; border-radius: 4px;">
        <orbit-listing-item [reorderIcon]="true" [showLeftIcon]="false" [showLabelValue]="false">
          <orbit-option-checkbox orbitLeftIcon label="Option" iconSize="small"></orbit-option-checkbox>
          <orbit-label-value-vertical
            orbitLabelValue
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          ></orbit-label-value-vertical>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        </orbit-listing-item>
      </div>
    `,
  }),
};

/** Multi-line mode for user rows. */
export const UserTable_MultiLine: Story = {
  name: 'User table — multiLine mode',
  render: () => ({
    template: `
      <div style="${tableWidth} background: #fff; border-radius: 4px;">
        <orbit-listing-item
          [multiLine]="true"
          [reorderIcon]="false"
          [showLabelValue]="false"
          title="Alice Fontaine"
          label="alice@orbit.io"
        >
          <orbit-option-checkbox orbitLeftIcon label="" aria-label="Select" iconSize="small"></orbit-option-checkbox>
          <div orbitAddIcons style="display: flex; gap: 16px; align-items: center;">
            ${tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        </orbit-listing-item>
      </div>
    `,
  }),
};

/** Stress: long text, many columns, all defaults on. */
export const Stress_LongContent: Story = {
  render: () => ({
    template: `
      <div style="width: 298px;">
        <orbit-listing-item
          [showTitle]="true"
          title="Very long title that should truncate or wrap gracefully"
          label="Extremely long label text"
          value="Very long value text that keeps going"
        ></orbit-listing-item>
        <orbit-listing-item
          [multiLine]="true"
          [showHelper]="true"
          title="Long multi-line title"
          label="Label"
          value="Value"
          helper="Helper text that is quite long and might cause layout issues"
        ></orbit-listing-item>
      </div>
    `,
  }),
};

/** Figma default width (298px) vs full-width table. */
export const WidthComparison: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">Figma width (298px)</p>
          <div style="width: 298px; background: #fff;">
            <orbit-listing-item label="Label" value="Value"></orbit-listing-item>
          </div>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">Full width (960px)</p>
          <div style="width: 960px; background: #fff;">
            <orbit-listing-item label="Label" value="Value"></orbit-listing-item>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Every iconSize × multiLine combination. */
export const IconSizeMatrix: Story = {
  render: () => ({
    template: `
      <div style="width: 298px; background: #fff;">
        <orbit-listing-item iconSize="small" label="Small / single" value="Value"></orbit-listing-item>
        <orbit-listing-item iconSize="big" label="Big / single" value="Value"></orbit-listing-item>
        <orbit-listing-item
          [multiLine]="true"
          iconSize="small"
          title="Small / multi"
          label="Label"
          value="Value"
        ></orbit-listing-item>
        <orbit-listing-item
          [multiLine]="true"
          iconSize="big"
          title="Big / multi"
          label="Label"
          value="Value"
        ></orbit-listing-item>
      </div>
    `,
  }),
};
