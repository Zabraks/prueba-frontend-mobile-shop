import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import '../src/styles/globals.scss';

const withLinkInterceptor: Decorator = (Story) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link && link.href) {
      e.preventDefault();
      console.log('[Storybook] Link clicked:', link.href);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <Story />;
};

const preview: Preview = {
  decorators: [withLinkInterceptor],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export default preview;