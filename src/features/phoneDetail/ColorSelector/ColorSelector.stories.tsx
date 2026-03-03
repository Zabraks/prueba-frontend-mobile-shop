import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ColorSelector } from './ColorSelector';
import { mockPhoneDetail } from '@/mocks/phoneDetail.mock';

const meta = {
  title: 'Features/PhoneDetail/ColorSelector',
  component: ColorSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ColorSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colors: mockPhoneDetail.colorOptions,
    selected: undefined,
  },
};

export const WithSelection: Story = {
  args: {
    colors: mockPhoneDetail.colorOptions,
    selected: 'Negro',
  },
};

export const DifferentSelection: Story = {
  args: {
    colors: mockPhoneDetail.colorOptions,
    selected: 'Azul',
  },
};

export const ManyColors: Story = {
  args: {
    colors: [
      { name: 'Negro', hexCode: '#000000', imageUrl: '' },
      { name: 'Blanco', hexCode: '#FFFFFF', imageUrl: '' },
      { name: 'Rojo', hexCode: '#FF0000', imageUrl: '' },
      { name: 'Azul', hexCode: '#0000FF', imageUrl: '' },
      { name: 'Verde', hexCode: '#00FF00', imageUrl: '' },
      { name: 'Morado', hexCode: '#800080', imageUrl: '' },
    ],
    selected: 'Rojo',
  },
};

export const TwoColors: Story = {
  args: {
    colors: [
      { name: 'Negro', hexCode: '#1a1a1a', imageUrl: '' },
      { name: 'Plata', hexCode: '#C0C0C0', imageUrl: '' },
    ],
    selected: 'Negro',
  },
};
