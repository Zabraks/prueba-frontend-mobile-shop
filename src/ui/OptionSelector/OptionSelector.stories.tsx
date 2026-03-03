import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { OptionSelector, type SelectorOption } from './OptionSelector';

const meta = {
  title: 'UI/OptionSelector',
  component: OptionSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const colorOptions: SelectorOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

export const Colors: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>('red');
    return (
      <OptionSelector
        {...args}
        selected={selected}
        onChange={(option) => setSelected(option.value)}
      />
    );
  },
  args: {
    options: colorOptions,
    ariaLabel: 'Select a color',
  },
};

export const NoSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <OptionSelector
        {...args}
        selected={selected}
        onChange={(option) => setSelected(option.value)}
      />
    );
  },
  args: {
    options: colorOptions,
    ariaLabel: 'Select an option',
  },
};
