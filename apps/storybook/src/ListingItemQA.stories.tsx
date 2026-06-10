import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LabelValueHorizontal,
  LabelValueVertical,
  ListingItem,
  OptionCheckbox,
  SuccessChip,
} from 'orbit-ds-components';

/**
 * QA stories for ListingItem — exercises every prop and common composition
 * patterns (including table-style rows like user management lists).
 */
const meta: Meta<typeof ListingItem> = {
  title: 'QA/Listing Item',
  component: ListingItem,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
};

export default meta;

type Story = StoryObj<typeof ListingItem>;

const tableWidth = { width: '100%', maxWidth: 960, minWidth: 640 };

/** All boolean prop combinations at a glance. */
export const PropMatrix: Story = {
  render: () => (
    <div style={{ ...tableWidth, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Single-line variants
        </h3>
        <ListingItem label="Default" value="Value" />
        <ListingItem reorderIcon={false} label="No reorder" value="Value" />
        <ListingItem showLeftIcon={false} label="No left icon" value="Value" />
        <ListingItem showRightIcon={false} label="No right icon" value="Value" />
        <ListingItem showTitle label="With title" value="Value" />
        <ListingItem showLabelValue={false} showTitle title="Title only" />
        <ListingItem iconSize="small" label="Small icons" value="Value" />
        <ListingItem onClick={() => undefined} label="Interactive" value="Value" />
      </section>

      <section>
        <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Multi-line variants
        </h3>
        <ListingItem multiLine title="Section" label="Label" value="Value" />
        <ListingItem
          multiLine
          showHelper
          title="With helper"
          label="Label"
          value="Value"
          helper="Additional context"
        />
        <ListingItem
          multiLine
          reorderIcon={false}
          showLeftIcon={false}
          showRightIcon={false}
          title="Minimal multi"
          label="Label"
          value="Value"
        />
      </section>

      <section>
        <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Custom slots
        </h3>
        <ListingItem
          labelValue={
            <LabelValueVertical layout="V + L" value="Custom value" label="Custom label" />
          }
        />
        <ListingItem
          addIconsComponent={
            <SuccessChip type="chip" size="compact">
              Active
            </SuccessChip>
          }
          label="With chip action"
          value="Value"
        />
      </section>
    </div>
  ),
};

const columnHeaderStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
};

const tableColumns = (
  <>
    <div style={{ flex: '0 0 80px', textAlign: 'right' }}>
      <span style={columnHeaderStyle}>Role</span>
    </div>
    <div style={{ flex: '0 0 100px', textAlign: 'right' }}>
      <span style={columnHeaderStyle}>Status</span>
    </div>
    <div style={{ flex: '0 0 100px', textAlign: 'right' }}>
      <span style={columnHeaderStyle}>Last seen</span>
    </div>
  </>
);

const tableRowColumns = (role: string, status: string, lastSeen: string) => (
  <>
    <div style={{ flex: '0 0 80px', textAlign: 'right' }}>
      <LabelValueHorizontal layout="L" label={role} />
    </div>
    <div
      style={{
        flex: '0 0 100px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <SuccessChip type="chip" size="compact">
        {status}
      </SuccessChip>
    </div>
    <div style={{ flex: '0 0 100px', textAlign: 'right' }}>
      <LabelValueHorizontal layout="L" label={lastSeen} />
    </div>
  </>
);

/**
 * Recreates the user-management table row from the reported bug.
 * Uses ListingItem the way a consumer naturally would: checkbox in leftIcon,
 * user info in labelValue, columns in addIconsComponent.
 */
export const UserTable_Recreation: Story = {
  name: 'User table — reported layout (broken)',
  render: () => (
    <div style={{ ...tableWidth, background: '#fff', borderRadius: 4 }}>
      {/* Header row */}
      <ListingItem
        reorderIcon={false}
        leftIcon={<OptionCheckbox label="Option" iconSize="small" />}
        showLabelValue={false}
        labelValue={
          <span style={columnHeaderStyle}>User</span>
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableColumns}
          </div>
        }
        showRightIcon={false}
      />

      {/* Data rows */}
      <ListingItem
        reorderIcon={false}
        leftIcon={<OptionCheckbox label="Option" iconSize="small" />}
        showLabelValue={false}
        labelValue={
          <LabelValueVertical
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          />
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        }
      />
      <ListingItem
        reorderIcon={false}
        leftIcon={<OptionCheckbox label="Option" iconSize="small" />}
        showLabelValue={false}
        labelValue={
          <LabelValueVertical
            layout="V + L"
            value="Bob Chen"
            label="bob@orbit.io"
          />
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Admin', 'Active', '2h ago')}
          </div>
        }
      />
      <ListingItem
        reorderIcon={false}
        leftIcon={<OptionCheckbox label="Option" iconSize="small" />}
        showLabelValue={false}
        labelValue={
          <LabelValueVertical
            layout="V + L"
            value="Carol Diaz"
            label="carol@orbit.io"
          />
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Member', 'Inactive', '3d ago')}
          </div>
        }
      />
    </div>
  ),
};

/** Checkbox only (no label) — common fix attempt for vertical "Option" text. */
export const UserTable_CheckboxNoLabel: Story = {
  name: 'User table — checkbox without label',
  render: () => (
    <div style={{ ...tableWidth, background: '#fff', borderRadius: 4 }}>
      <ListingItem
        reorderIcon={false}
        leftIcon={
          <OptionCheckbox label="" aria-label="Select row" iconSize="small" />
        }
        showLabelValue={false}
        labelValue={
          <LabelValueVertical
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          />
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        }
      />
    </div>
  ),
};

/** Checkbox in reorder slot instead of leftIcon. */
export const UserTable_CheckboxInReorder: Story = {
  name: 'User table — checkbox in reorder slot',
  render: () => (
    <div style={{ ...tableWidth, background: '#fff', borderRadius: 4 }}>
      <ListingItem
        reorderIcon
        leftIcon={<OptionCheckbox label="Option" iconSize="small" />}
        showLeftIcon={false}
        showLabelValue={false}
        labelValue={
          <LabelValueVertical
            layout="V + L"
            value="Alice Fontaine"
            label="alice@orbit.io"
          />
        }
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        }
      />
    </div>
  ),
};

/** Multi-line mode for user rows. */
export const UserTable_MultiLine: Story = {
  name: 'User table — multiLine mode',
  render: () => (
    <div style={{ ...tableWidth, background: '#fff', borderRadius: 4 }}>
      <ListingItem
        multiLine
        reorderIcon={false}
        leftIcon={<OptionCheckbox label="" aria-label="Select" iconSize="small" />}
        showLabelValue={false}
        title="Alice Fontaine"
        label="alice@orbit.io"
        addIconsComponent={
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {tableRowColumns('Owner', 'Active', 'Just now')}
          </div>
        }
      />
    </div>
  ),
};

/** Stress: long text, many columns, all defaults on. */
export const Stress_LongContent: Story = {
  render: () => (
    <div style={{ width: 298 }}>
      <ListingItem
        showTitle
        title="Very long title that should truncate or wrap gracefully"
        label="Extremely long label text"
        value="Very long value text that keeps going"
      />
      <ListingItem
        multiLine
        showHelper
        title="Long multi-line title"
        label="Label"
        value="Value"
        helper="Helper text that is quite long and might cause layout issues"
      />
    </div>
  ),
};

/** Figma default width (298px) vs full-width table. */
export const WidthComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Figma width (298px)
        </p>
        <div style={{ width: 298, background: '#fff' }}>
          <ListingItem label="Label" value="Value" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Full width (960px)
        </p>
        <div style={{ width: 960, background: '#fff' }}>
          <ListingItem label="Label" value="Value" />
        </div>
      </div>
    </div>
  ),
};

/** Every iconSize × multiLine combination. */
export const IconSizeMatrix: Story = {
  render: () => (
    <div style={{ width: 298, background: '#fff' }}>
      <ListingItem iconSize="small" label="Small / single" value="Value" />
      <ListingItem iconSize="big" label="Big / single" value="Value" />
      <ListingItem
        multiLine
        iconSize="small"
        title="Small / multi"
        label="Label"
        value="Value"
      />
      <ListingItem
        multiLine
        iconSize="big"
        title="Big / multi"
        label="Label"
        value="Value"
      />
    </div>
  ),
};
