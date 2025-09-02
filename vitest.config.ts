import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Altere para 'jsdom' se testar código front-end
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
    },
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@services': '/src/services',
      '@middlewares': '/src/middlewares',
      '@controllers': '/src/controllers',
    },
  },
});
