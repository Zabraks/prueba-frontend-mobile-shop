import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotFound } from './NotFound';

const meta = {
  title: 'Features/NotFound',
  component: NotFound,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
