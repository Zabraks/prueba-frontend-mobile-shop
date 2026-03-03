import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Features/PhoneList/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: '',
    resultsCount: 20,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Samsung',
    resultsCount: 5,
  },
};

export const LongSearchTerm: Story = {
  args: {
    value: 'iPhone 15 Pro Max',
    resultsCount: 1,
  },
};

export const NoResults: Story = {
  args: {
    value: 'xyz123',
    resultsCount: 0,
  },
};

export const ManyResults: Story = {
  args: {
    value: '',
    resultsCount: 156,
  },
};
