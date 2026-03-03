import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SimilarProducts } from './SimilarProducts';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';
import { mockPhoneList } from '@/mocks/phonelist.mock';

const meta = {
  title: 'Features/PhoneDetail/SimilarProducts',
  component: SimilarProducts,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SimilarProducts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phones: mockPhoneDetail.similarProducts,
  },
};

export const ManyProducts: Story = {
  args: {
    phones: mockPhoneList.slice(0, 8),
  },
};

export const FewProducts: Story = {
  args: {
    phones: mockPhoneDetail.similarProducts.slice(0, 2),
  },
};

export const SingleProduct: Story = {
  args: {
    phones: [mockPhoneDetail.similarProducts[0]],
  },
};
