import type { Meta, StoryFn } from '@storybook/nextjs-vite';
import { Grid } from './Grid';
import { PhoneItem } from '@/features/phoneList/PhoneItem/PhoneItem';
import { mockPhoneList } from '@/mocks/phonelist.mock';
import type { PhoneListItem } from '@/domain/phone/phone.types';

const meta: Meta<typeof Grid> = {
  title: 'UI/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

interface Item {
  id: string;
  label: string;
}

const mockItems: Item[] = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
  { id: '4', label: 'Item 4' },
  { id: '5', label: 'Item 5' },
  { id: '6', label: 'Item 6' },
  { id: '7', label: 'Item 7' },
  { id: '8', label: 'Item 8' },
  { id: '9', label: 'Item 9' },
  { id: '10', label: 'Item 10' },
];

const renderMockItem = (item: Item) => (
  <div
    style={{
      padding: '20px',
      background: '#f0f0f0',
      borderRadius: '8px',
      textAlign: 'center',
      minHeight: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <span>{item.label}</span>
  </div>
);

export const Default: StoryFn = () => (
  <Grid<Item>
    items={mockItems}
    keyExtractor={(item) => item.id}
    ariaLabel="Grid of items"
    renderItem={renderMockItem}
  />
);

export const Extended: StoryFn = () => (
  <Grid<Item>
    items={mockItems}
    keyExtractor={(item) => item.id}
    ariaLabel="Grid with extended variant"
    variant="extended"
    renderItem={(item) => (
      <div
        style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          textAlign: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>{item.label}</span>
      </div>
    )}
  />
);

export const WithFewItems: StoryFn = () => (
  <Grid<Item>
    items={mockItems.slice(0, 3)}
    keyExtractor={(item) => item.id}
    ariaLabel="Grid with few items"
    renderItem={renderMockItem}
  />
);

export const PhoneListGrid: StoryFn = () => (
  <Grid<PhoneListItem>
    items={mockPhoneList}
    keyExtractor={(phone, index) => `${phone.id}-${index}`}
    ariaLabel="Phone catalog grid"
    renderItem={(phone, index) => <PhoneItem phone={phone} priority={index === 0} />}
  />
);

export const PhoneListGridFewItems: StoryFn = () => (
  <Grid<PhoneListItem>
    items={mockPhoneList.slice(0, 4)}
    keyExtractor={(phone, index) => `${phone.id}-${index}`}
    ariaLabel="Phone catalog grid with few items"
    renderItem={(phone, index) => <PhoneItem phone={phone} priority={index === 0} />}
  />
);
