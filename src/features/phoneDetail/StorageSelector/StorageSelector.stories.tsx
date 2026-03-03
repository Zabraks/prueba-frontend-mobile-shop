import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { StorageSelector } from './StorageSelector';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';

const meta = {
  title: 'Features/PhoneDetail/StorageSelector',
  component: StorageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof StorageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: mockPhoneDetail.storageOptions,
    selected: undefined,
  },
};

export const WithSelection: Story = {
  args: {
    options: mockPhoneDetail.storageOptions,
    selected: '128 GB',
  },
};

export const HigherCapacitySelected: Story = {
  args: {
    options: mockPhoneDetail.storageOptions,
    selected: '256 GB',
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { capacity: '64 GB', price: 699 },
      { capacity: '128 GB', price: 799 },
      { capacity: '256 GB', price: 899 },
      { capacity: '512 GB', price: 1099 },
      { capacity: '1 TB', price: 1299 },
    ],
    selected: '256 GB',
  },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { capacity: '128 GB', price: 459 },
      { capacity: '256 GB', price: 529 },
    ],
    selected: '128 GB',
  },
};
