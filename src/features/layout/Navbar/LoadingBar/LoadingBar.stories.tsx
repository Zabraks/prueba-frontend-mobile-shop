import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import styles from './LoadingBar.module.scss';

const LoadingBarDemo = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={styles.progressBar}
      data-loading={isLoading}
      role="progressbar"
      aria-hidden={!isLoading}
      aria-label="Loading navigation"
    />
  );
};

const meta = {
  title: 'Features/Layout/LoadingBar',
  component: LoadingBarDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '60px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingBarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
