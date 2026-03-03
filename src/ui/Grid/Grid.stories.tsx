import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Grid } from './Grid';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { mockPhoneList } from '@/mocks/phonelist.mock';

const meta = {
  title: 'UI/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'extended'],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Item {
  id: string;
  label: string;
}

const mockItems: Item[] = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
  { id: '4', label: 'Item 4' },
  { id: '5', label: 'Item 5' },
  { id: '6', label: 'Item 6' },
  { id: '1', label: 'Item 7' },
  { id: '2', label: 'Item 8' },
  { id: '3', label: 'Item 9' },
  { id: '4', label: 'Item 10' },
];

export const Default: Story = {
  args: {
    items: mockItems,
    keyExtractor: (item) => item.id,
    ariaLabel: 'Grid of items',
    renderItem: (item) => (
      <div
        style={{
          padding: '20px',
          background: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{item.label}</span>
      </div>
    ),
  },
};

export const Extended: Story = {
  args: {
    items: mockItems,
    keyExtractor: (item) => item.id,
    ariaLabel: 'Grid with extended variant',
    variant: 'extended',
    renderItem: (item) => (
      <div
        style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          textAlign: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{item.label}</span>
      </div>
    ),
  },
};

export const WithFewItems: Story = {
  args: {
    items: mockItems.slice(0, 3),
    keyExtractor: (item) => item.id,
    ariaLabel: 'Grid with few items',
    renderItem: (item) => (
      <div
        style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          textAlign: 'center',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{item.label}</span>
      </div>
    ),
  },
};

export const PhoneListGrid: Story = {
  args: {
    items: mockPhoneList,
    keyExtractor: (phone, index) => `${phone.id}-${index}`,
    ariaLabel: 'Phone catalog grid',
    renderItem: (phone, index) => <PhoneItem phone={phone} priority={index === 0} />,
  },
};

export const PhoneListGridFewItems: Story = {
  args: {
    items: mockPhoneList.slice(0, 4),
    keyExtractor: (phone, index) => `${phone.id}-${index}`,
    ariaLabel: 'Phone catalog grid with few items',
    renderItem: (phone, index) => <PhoneItem phone={phone} priority={index === 0} />,
  },
};
