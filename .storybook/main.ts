import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.resolve(__dirname, '../src');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  viteFinal: async (config /*, { configType } */) => {
    const alias = {
      ...(config.resolve?.alias || {}),
      '@': srcPath,
      '@/app': path.resolve(srcPath, 'app'),
      '@/assets': path.resolve(srcPath, 'assets'),
      '@/config': path.resolve(srcPath, 'config'),
      '@/context': path.resolve(srcPath, 'context'),
      '@/domain': path.resolve(srcPath, 'domain'),
      '@/features': path.resolve(srcPath, 'features'),
      '@/hooks': path.resolve(srcPath, 'hooks'),
      '@/lib': path.resolve(srcPath, 'lib'),
      '@/mocks': path.resolve(srcPath, 'mocks'),
      '@/services': path.resolve(srcPath, 'services'),
      '@/styles': path.resolve(srcPath, 'styles'),
      '@/ui': path.resolve(srcPath, 'ui'),
    };

    return {
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias,
      },
      css: {
        ...(config.css || {}),
        preprocessorOptions: {
          ...(config.css?.preprocessorOptions || {}),
          scss: {
            ...(config.css?.preprocessorOptions?.scss || {}),
            includePaths: [path.resolve(srcPath, 'styles')],
          },
        },
      },
    };
  },
};

export default config;