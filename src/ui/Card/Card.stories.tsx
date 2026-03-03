import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3>Card Title</h3>
        <p>This is a card component with content inside.</p>
      </div>
    ),
  },
};

export const WithText: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <p>Simple card with text content.</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <div style={{ width: '100%', height: '200px', background: '#e0e0e0' }} />
        <div style={{ padding: '20px' }}>
          <h3>Card with Image</h3>
          <p>Image placeholder above the text.</p>
        </div>
      </div>
    ),
  },
};
