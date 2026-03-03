import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ErrorView } from './ErrorView';
import { ROUTES } from '@/config/routes';

const meta = {
  title: 'Features/ErrorView',
  component: ErrorView,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneCatalogError: Story = {
  args: {
    section: 'phones',
    actions: [{ action: 'tryAgain', onClick: fn() }],
  },
};

export const PhoneDetailError: Story = {
  args: {
    section: 'phoneDetail',
    actions: [
      { action: 'tryAgain', onClick: fn() },
      { action: 'goBack', href: ROUTES.phones },
    ],
  },
};

export const CartError: Story = {
  args: {
    section: 'cart',
    actions: [
      { action: 'tryAgain', onClick: fn() },
      { action: 'continueShopping', href: ROUTES.phones },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    section: 'phones',
    actions: [{ action: 'goBack', href: ROUTES.phones }],
  },
};
