import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.tsx'],
    exclude: ['tests/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.module.scss',
        'src/styles/**',
        'src/mocks/**',
        'src/app/**',
        'src/domain/**',
        'src/lib/**',
        'src/services/**',
        'src/**/*.stories.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/context': path.resolve(__dirname, './src/context'),
      '@/domain': path.resolve(__dirname, './src/domain'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/mocks': path.resolve(__dirname, './src/mocks'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/ui': path.resolve(__dirname, './src/ui'),
    },
  },
});
