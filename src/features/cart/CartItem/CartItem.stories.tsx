import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { CartItem } from './CartItem';
import { mockCart } from '@/mocks/cart.mock';

const meta = {
  title: 'Features/Cart/CartItem',
  component: CartItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onRemove: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: mockCart[0],
  },
};

export const AnotherItem: Story = {
  args: {
    item: mockCart[1],
  },
};

export const LongName: Story = {
  args: {
    item: {
      ...mockCart[0],
      name: 'Samsung Galaxy S24 Ultra 5G Ultra 5G Ultra 5G Ultra 5G',
    },
  },
};

export const HighPrice: Story = {
  args: {
    item: {
      ...mockCart[0],
      price: 1899,
    },
  },
};
