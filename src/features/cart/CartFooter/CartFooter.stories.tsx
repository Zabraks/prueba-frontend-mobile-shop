import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { CartFooter } from './CartFooter';

const meta = {
  title: 'Features/Cart/CartFooter',
  component: CartFooter,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  args: {
    onPay: fn(),
  },
} satisfies Meta<typeof CartFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    totalPrice: 728,
    hasItems: true,
  },
};

export const Empty: Story = {
  args: {
    totalPrice: 0,
    hasItems: false,
  },
};

export const HighTotal: Story = {
  args: {
    totalPrice: 2499,
    hasItems: true,
  },
};
