import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PhoneItem } from './PhoneItem';
import type { PhoneListItem } from '@/domain/phone/phone.types';
import { mockPhoneList } from '@/mocks/phonelist.mock';

const meta = {
  title: 'Features/PhoneItem',
  component: PhoneItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PhoneItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPhone: PhoneListItem = mockPhoneList[0];

const mockPhoneWithLongName: PhoneListItem = mockPhoneList[1];

export const Default: Story = {
  args: {
    phone: mockPhone,
    priority: false,
  },
};

export const Priority: Story = {
  args: {
    phone: mockPhone,
    priority: true,
  },
};

export const DifferentPhone: Story = {
  args: {
    phone: mockPhoneWithLongName,
    priority: false,
  },
};

export const WithLongName: Story = {
  args: {
    phone: {
      ...mockPhone,
      name: 'Very Very Very Very Very Very Long Phone Name',
    },
    priority: false,
  },
};
