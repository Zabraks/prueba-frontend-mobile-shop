import type { Meta, StoryFn } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { OptionSelector, type SelectorOption } from './OptionSelector';

const meta: Meta<typeof OptionSelector> = {
  title: 'UI/OptionSelector',
  component: OptionSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const colorOptions: SelectorOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

export const Colors: StoryFn = () => {
  const [selected, setSelected] = useState<string | null>('red');
  return (
    <OptionSelector
      options={colorOptions}
      ariaLabel="Select a color"
      selected={selected}
      onChange={(option) => setSelected(option.value)}
    />
  );
};

export const NoSelection: StoryFn = () => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <OptionSelector
      options={colorOptions}
      ariaLabel="Select an option"
      selected={selected}
      onChange={(option) => setSelected(option.value)}
    />
  );
};
